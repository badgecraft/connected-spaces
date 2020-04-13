import path from 'path';
import http from 'http';
import App from './components/App';
// import assets from './asset-manifest.json'; // eslint-disable-line import/no-unresolved
import chunks from './chunk-manifest.json'; // eslint-disable-line import/no-unresolved
import locales from './locale-manifest.json'; // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore';
import config from './config';
import paths from './constants/paths';
import wpPageProxy from './wpPageProxy';
import pConfig from './publicConfig';
import createServerApp from './server/createServerApp';
import { defaultLanguage } from './i18n-loader';
import createTracer from './server/createTracer';
import pkg from '../package';

http.globalAgent.keepAlive = true;
http.globalAgent.timeout = 500;

process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at:', p, 'reason:', reason);
    // send entire app down. Process manager will restart it
    process.exit(1);
});

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

const { app, apiProxy } = createServerApp({
    config,
    staticPath:       path.resolve(__dirname, 'public'),
    pConfig,
    wpPageProxy,
    paths,
    defaultLanguage,
    enabledLanguages: locales.map(({ name }) => name),
    configureStore,
    // eslint-disable-next-line global-require
    getRouter:        () => require('./router').default,
    chunks,
    locales,
    App,
    tracer:           createTracer({ pkg, serviceName: 'connected' }),
    pkg,
});

//
// Launch the server
// -----------------------------------------------------------------------------
if (!module.hot) {
    const server = http.createServer(app);
    server.on('upgrade', (req, socket, head) => apiProxy.ws(req, socket, head));
    server.listen(config.port, () => {
        console.info(`The server is running at http://localhost:${config.port}/`);
        console.info(`Serving for ${config.webAddress} with oauth-id ${config.auth.badgecraft.id}`);
    });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
    app.hot = module.hot;
    module.hot.accept('./router');
}

export default app;
