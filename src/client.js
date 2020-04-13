import 'whatwg-fetch';
import App from './components/App';
import configureStore from './store/configureStore';
import paths from './constants/paths';
import pConfig from './publicConfig';
import createClientApp from './server/createClientApp';

const forceUpdate = createClientApp({
    App,
    // eslint-disable-next-line global-require
    getRouter: () => require('./router').default,
    paths,
    configureStore,
    pConfig,
});

// Enable Hot Module Replacement (HMR)
if (module.hot) {
    module.hot.accept('./router', forceUpdate);
}
