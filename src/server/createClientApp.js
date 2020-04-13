import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import deepForceUpdate from 'react-deep-force-update';
import queryString from 'query-string';
import _set from 'lodash/set';
import _get from 'lodash/get';
import { createPath } from 'history/PathUtils';
import Cookies from 'universal-cookie';
import createFetch from './system/createFetch';
import { updateMeta } from './DOMUtils';
import history from './history';
import createApolloClient from './system/createApolloClient';
import { isDisabledReRouteOnClient, runScrollRestore } from '../ui/uiDisableReRouteOnClient';

export default ({ configureStore, getRouter, paths, pConfig, App }) => {
    const { lang } = document.documentElement;
    const serverTimeMillisGMT = Date.parse(new Date(_get(window.App, 'state.runtime.initialNow')).toUTCString());
    const localMillisUTC = Date.parse(new Date().toUTCString());
    const timeOffset = serverTimeMillisGMT - localMillisUTC;

    _set(window.App, 'state.runtime.timeOffset', timeOffset);

    // Universal HTTP client
    const fetch = createFetch(window.fetch, {
        baseUrl: window.App.apiUrl,
    });

    const apolloClient = createApolloClient({ lang, oauthClientId: window.App.oauthClientId });
    const context = {
        // Enables critical path CSS rendering
        // https://github.com/kriasoft/isomorphic-style-loader
        insertCss:         (...styles) => {
            // eslint-disable-next-line no-underscore-dangle
            const removeCss = styles.map(x => x._insertCss());
            return () => {
                removeCss.forEach(f => f());
            };
        },
        // For react-apollo
        client:            apolloClient,
        // Initialize a new Redux store
        // http://redux.js.org/docs/basics/UsageWithReact.html
        store:             configureStore(window.App.state, { fetch, history }),
        fetch,
        storeSubscription: null,
        baseURL:           window.App.baseURL,
        bcWebURL:          window.App.bcWebURL,
        lang,
        cookies:           new Cookies(),
        paths,
        platforms:         pConfig.platforms,
    };

    const container = document.getElementById('app');
    let currentLocation = history.location;
    let appInstance;

    const scrollPositionsHistory = {};

    // Re-render the app when window.location changes
    async function onLocationChange(location, action) {
        if (isDisabledReRouteOnClient()) {
            return;
        }
        // Remember the latest scroll position for the previous location
        scrollPositionsHistory[currentLocation.key] = {
            scrollX: window.pageXOffset,
            scrollY: window.pageYOffset,
        };
        // Delete stored scroll position for next page if any
        if (action === 'PUSH') {
            delete scrollPositionsHistory[location.key];
        }
        currentLocation = location;

        const isInitialRender = !action;
        try {
            context.pathname = location.pathname;
            context.query = queryString.parse(location.search);

            // Traverses the list of routes in the order they are defined until
            // it finds the first route that matches provided URL path string
            // and whose action method returns anything other than `undefined`.
            const route = await getRouter().resolve(context);

            // Prevent multiple page renders during the routing process
            if (currentLocation.key !== location.key) {
                return;
            }

            const menu = document.getElementById('menu');
            if (menu) {
                menu.checked = false;
            }
            const profile = document.getElementById('profile');
            if (profile) {
                profile.checked = false;
            }

            if (route.redirect) {
                // TODO need a better solution
                if (route.redirect.indexOf('/dashboard/auth') === 0) {
                    window.location.href = route.redirect;
                } else {
                    history.replace(route.redirect);
                }
                return;
            }

            const renderReactApp = isInitialRender ? ReactDOM.hydrate : ReactDOM.render;
            appInstance = renderReactApp(
                <App context={context}>{route.component}</App>,
                container,
                () => {
                    if (isInitialRender) {
                        // Switch off the native scroll restoration behavior and handle it manually
                        // https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
                        if (window.history && 'scrollRestoration' in window.history) {
                            window.history.scrollRestoration = 'manual';
                        }

                        const elem = document.getElementById('css');
                        if (elem) elem.parentNode.removeChild(elem);
                        return;
                    }

                    document.title = route.title;

                    updateMeta('description', route.description);
                    // Update necessary tags in <head> at runtime here, ie:
                    // updateMeta('keywords', route.keywords);
                    // updateCustomMeta('og:url', route.canonicalUrl);
                    // updateCustomMeta('og:image', route.imageUrl);
                    // updateLink('canonical', route.canonicalUrl);
                    // etc.

                    let scrollX = 0;
                    let scrollY = 0;
                    const pos = scrollPositionsHistory[location.key];
                    if (pos) {
                        scrollX = pos.scrollX;
                        scrollY = pos.scrollY;
                    } else {
                        const targetHash = location.hash.substr(1);
                        if (targetHash) {
                            const target = document.getElementById(targetHash);
                            if (target) {
                                scrollY = window.pageYOffset + target.getBoundingClientRect().top;
                            }
                        }
                    }

                    // Restore the scroll position if it was saved into the state
                    // or scroll to the given #hash anchor
                    // or scroll to top of the page
                    // window.scrollTo(scrollX, scrollY);
                    runScrollRestore(() => window.scrollTo({ left: scrollX, top: scrollY, behavior: 'smooth' }));

                    // Google Analytics tracking. Don't send 'pageview' event after
                    // the initial rendering, as it was already sent
                    if (window.ga) {
                        window.ga('send', 'pageview', createPath(location));
                    }
                },
            );
        } catch (error) {
            if (__DEV__) {
                throw error;
            }

            console.error(error);

            // Do a full page reload if error occurs during client-side navigation
            if (!isInitialRender && currentLocation.key === location.key) {
                console.error('RSK will reload your page after error');
                window.location.reload();
            }
        }
    }

    // Handle client-side navigation by using HTML5 History API
    // For more information visit https://github.com/mjackson/history#readme
    history.listen(onLocationChange);
    onLocationChange(currentLocation);

    setInterval(() => context.store.dispatch({ type: 'APP_TICK', payload: { now: Date.now() } }), 15000);

    return () => {
        if (appInstance && appInstance.updater.isMounted(appInstance)) {
            // Force-update the whole tree, including components that refuse to update
            deepForceUpdate(appInstance);
        }

        onLocationChange(currentLocation);
    };
};
