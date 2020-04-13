import express from 'express';
import cookieMiddle from 'universal-cookie-express';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt';
import proxy from 'express-http-proxy';
import jwt from 'jsonwebtoken';
import httpProxy from 'http-proxy';
import cookie from 'cookie';
import _get from 'lodash/get';
import util from 'util';
import qs from 'query-string';
import { FORMAT_HTTP_HEADERS, Tags } from 'opentracing';
import errorMiddleware from './system/errorMiddleware';
import createLocaleSelector from './i18n/selector';
import createPassport from './system/createPassport';
import createReactRoute from './system/reactRoute';
import createWpProxy from './system/createWpProxy';

const isMultipartRequest = req => {
    const contentTypeHeader = req.headers['content-type'];
    return contentTypeHeader && contentTypeHeader.indexOf('multipart') > -1;
};

const notMultiPart = middleware => (req, res, next) => {
    if (isMultipartRequest(req)) {
        return next();
    }
    return middleware(req, res, next);
};

const toBackURL = paths => (back = paths.home) => {
    if (back.indexOf('/') === 0 && back.indexOf(paths.authorize) === -1) {
        return back;
    }

    return paths.home;
};

export const createHttpProxy = ({ config }) => {
    const apiProxy = httpProxy.createProxyServer({ target: config.auth.badgecraft.apiHost, ws: true });
    apiProxy.on('proxyReq', (proxyReq, req) => {
        const cookies = cookie.parse(_get(req, 'headers.cookie') || '', {});
        let accessToken = null;

        if (cookies.id_token) {
            const decoded = jwt.verify(cookies.id_token, config.auth.jwt.secret);
            accessToken = _get(decoded, 'accessToken', null);
        }

        if (proxyReq) {
            proxyReq.setHeader('X-OAuth-Client', config.auth.badgecraft.id);
            if (accessToken) {
                proxyReq.setHeader('Authorization', `Bearer ${accessToken}`);
            }
        }
    });

    apiProxy.on('error', (err, req, res) => {
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        console.error(JSON.stringify({ message: 'proxy error', error: util.inspect(err) }));
        res.end('Something went wrong. And we are reporting a custom error message.');
    });
    return apiProxy;
};

export default (options) => {
    const {
        config, wpPageProxy, staticPath, paths, defaultLanguage, enabledLanguages, pConfig, configureStore, chunks,
        locales, App, getRouter, tracer, wpCssTransform = true, pkg,
    } = options;

    const apiProxy = createHttpProxy({ config });
    const localeDetect = createLocaleSelector({ defaultLanguage, enabledLanguages });
    const app = express();
    const passport = createPassport({ config, paths });
    const wpProxy = createWpProxy({ config, wpCssTransform });

    const reactRoute = createReactRoute({
        config,
        paths,
        pConfig,
        configureStore,
        getRouter,
        wpPageProxy,
        chunks,
        locales,
        App,
        tracer,
    });


    app.set('trust proxy', config.trustProxy);

    app.use((req, res, next) => {
        const span = tracer.startSpan('express_request', {
            childOf: tracer.extract(FORMAT_HTTP_HEADERS, req.headers),
        });

        const resHeaders = {};
        tracer.inject(span, FORMAT_HTTP_HEADERS, resHeaders);
        res.set(resHeaders);

        const finishSpan = () => {
            span.setTag(Tags.HTTP_STATUS_CODE, res.statusCode);
            if (!(res.statusCode >= 200 && res.statusCode < 400)) {
                span.setTag(Tags.ERROR, true);
            }
            span.finish();
        };

        res.on('finish', finishSpan);
        res.on('close', finishSpan);
        req.span = span;
        next();
    });

    app.head('/health/check', (req, res) => res.end());
    app.get('/health/check', (req, res) => res.send({ version: pkg.version }));

    app.get('/api/*', (req, res) => apiProxy.web(req, res, {}));
    app.post('/api/*', (req, res) => apiProxy.web(req, res, {}));
    app.put('/api/*', (req, res) => apiProxy.web(req, res, {}));

    // proxy all wordpress stuff directly!
    app.all('/wp-*', wpProxy);

    //
    // Register Node.js middleware
    // -----------------------------------------------------------------------------
    app.use(express.static(staticPath));
    app.use(cookieParser());
    app.use(cookieMiddle());
    app.use(cookieSession({
        name: 'session',
        keys: ['key1', 'key2']
    }));

    app.use(notMultiPart(bodyParser.urlencoded({ extended: true })));
    app.use(notMultiPart(bodyParser.json()));

    app.use((req, res, next) => {
        req.lang = localeDetect(
            _get(req, 'cookies.lang'),
            _get(req, 'headers.accept-language'),
            _get(req, 'query.lang'),
        );
        res.cookie('lang', req.lang, { maxAge: 1000 * 60 * 60 * 24 * 365, httpOnly: true });
        next();
    });

    app.use(
        expressJwt({
            secret:              config.auth.jwt.secret,
            credentialsRequired: false,
            getToken:            req => req.cookies.id_token,
        }),
    );

    // Error handler for express-jwt
    app.use((err, req, res, next) => {
        // eslint-disable-line no-unused-vars
        if (err instanceof Jwt401Error) {
            console.error(JSON.stringify({ message: 'express-jwt-error', id_token: req.cookies.id_token }));
            // `clearCookie`, otherwise user can't use web-app until cookie expires
            res.clearCookie('id_token');
            return next();
        }
        return next(err);
    });

    //
    // Authentication
    // -----------------------------------------------------------------------------
    app.use(passport.initialize());

    app.get(
        paths.authorize,
        (req, res, next) => {
            res.cookie('back', toBackURL(paths)(req.query.back), { maxAge: 1000 * 60 * 60, httpOnly: true });
            next();
        },
        passport.authenticate('oauth2', { session: false }),
    );

    app.get(
        paths.authorizeCallback,
        passport.authenticate('oauth2', {
            failureRedirect: '/?auth=failure',
            session:         false,
        }),
        (req, res) => {
            const expiresIn = 60 * 60 * 24 * 180; // 180 days
            const token = jwt.sign(req.user, config.auth.jwt.secret, { expiresIn });
            res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });

            if (req.cookies.back) {
                res.clearCookie('back');
                res.redirect(toBackURL(paths)(req.cookies.back));
                return;
            }

            res.redirect(paths.home);
        },
    );

    app.get(
        paths.logout,
        (req, res) => {
            res.clearCookie('id_token');
            res.redirect(paths.afterLogout);
        }
    );

    app.get(
        '/storage/:bucket/:fileName',
        proxy(config.auth.badgecraft.apiHost, {
            limit:                '50mb',
            proxyReqPathResolver: req => {
                const to = parseInt(req.query.download, 10) === 1 ? 'download' : 'raw';
                return `/api/v1/storage/${req.params.bucket}/${to}/${req.params.fileName}?${qs.stringify(req.query)}`;
            },
            proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
                const accessToken = srcReq.user && srcReq.user.accessToken;
                proxyReqOpts.headers.Authorization = `Bearer ${accessToken}`; // eslint-disable-line no-param-reassign
                return proxyReqOpts;
            },
        }),
    );

    app.get('*', reactRoute);
    app.post('*', reactRoute);

    app.use(errorMiddleware);

    return { app, apiProxy };
};
