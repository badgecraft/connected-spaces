import React from 'react';
import ReactDOM from 'react-dom/server';
import { getDataFromTree } from 'react-apollo';
import { renderStylesToString } from 'emotion-server';
import nodeFetch from 'node-fetch';
import { FORMAT_HTTP_HEADERS } from 'opentracing';
import { addLocale, useLocale } from 'ttag';
import createFetch from './createFetch';
import createApolloClient from './createApolloClient'
import Html from '../componetns/Html';

export default (options) => {
    const {
        config, paths, pConfig, configureStore, getRouter, wpPageProxy, chunks, App, locales, tracer,
    } = options;

    locales.forEach(({ name, data }) => addLocale(name, data));

    return async (req, res, next) => {
        req.span.log({ event: 'react-route' });
        try {
            const css = new Set();

            // Enables critical path CSS rendering
            // https://github.com/kriasoft/isomorphic-style-loader
            const insertCss = (...styles) => {
                // eslint-disable-next-line no-underscore-dangle
                styles.forEach(style => css.add(style._getCss()));
            };

            const apolloHeaders = {};
            tracer.inject(req.span, FORMAT_HTTP_HEADERS, apolloHeaders);
            const apolloClient = createApolloClient({
                host:          config.auth.badgecraft.host,
                accessToken:   req.user && req.user.accessToken,
                oauthClientId: config.auth.badgecraft.id,
                lang:          req.lang,
                headers:       apolloHeaders,
            });

            // Universal HTTP client
            const fetch = createFetch(nodeFetch, {
                baseUrl: config.api.serverUrl,
                cookie:  req.headers.cookie,
            });

            const initialState = {
                user: req.user || null,
            };

            const store = configureStore(initialState, {
                cookie:  req.headers.cookie,
                fetch,
                // I should not use `history` on server.. but how I do redirection? follow universal-router
                history: null,
            });

            store.dispatch({ type: 'SET_RUNTIME_VARIABLE', payload: { name: 'initialNow', value: Date.now() } });

            // Global (context) variables that can be easily accessed from any React component
            // https://facebook.github.io/react/docs/context.html
            const context = {
                lang:              req.lang,
                insertCss,
                fetch,
                // The twins below are wild, be careful!
                pathname:          req.path,
                query:             req.query,
                // You can access redux through react-redux connect
                store,
                storeSubscription: null,
                // Apollo Client for use with react-apollo
                client:            apolloClient,
                baseURL:           config.webAddress,
                bcWebURL:          config.auth.badgecraft.externalHost,
                cookies:           req.universalCookies,
                paths,

                platforms: pConfig.platforms,
            };

            req.span.log({ event: 'react-route:resolve-route' });
            const route = await getRouter().resolve(context);

            if (route.redirect) {
                res.redirect(route.status || 302, route.redirect);
                return;
            }
            req.span.log({ event: 'react-route:root-component' });
            const data = { ...route };
            const rootComponent = (<App context={context}>{route.component}</App>);
            req.span.log({ event: 'react-route:await-data' });
            await getDataFromTree(rootComponent);
            // this is here because of Apollo redux APOLLO_QUERY_STOP action
            await new Promise(resolve => setTimeout(resolve, 0));
            req.span.log({ event: 'react-route:await locale' });
            useLocale(context.lang);
            req.span.log({ event: 'react-route:render1' });
            data.children = await renderStylesToString(ReactDOM.renderToString(rootComponent));

            const scripts = new Set();
            const addChunk = chunk => {
                const chunkName = `${chunk}:${context.lang}`;
                if (chunks[chunkName]) {
                    chunks[chunkName].forEach(asset => scripts.add(asset));
                } else if (__DEV__) {
                    throw new Error(`Chunk with name '${chunkName}' cannot be found`);
                }
            };
            addChunk('client');

            if (route.chunk) addChunk(route.chunk);
            if (route.chunks) route.chunks.forEach(addChunk);
            data.scripts = Array.from(scripts);

            data.app = {
                apiUrl:        config.api.clientUrl,
                oauthClientId: config.auth.badgecraft.id,
                state:         context.store.getState(),
                apolloState:   context.client.extract(),
                baseURL:       config.webAddress,
                bcWebURL:      config.auth.badgecraft.externalHost,
            };
            data.lang = context.lang;
            data.googleTrackingId = config.analytics.googleTrackingId;

            req.span.log({ event: 'react-route:render2' });
            // eslint-disable-next-line react/jsx-props-no-spreading
            const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
            if (route.status === 404) {
                wpPageProxy(html, req, res, next);
                return;
            }

            res.status(route.status || 200);
            res.send(`<!doctype html>${html}`);
        } catch (err) {
            next(err);
        }
    };
}