import proxy from 'express-http-proxy';
import _get from 'lodash/get';
import cssParser from 'css';
import url from 'url';

const prefixSelectors = ({ selectors, ...rule }) => ({ ...rule, selectors: selectors.map(sel => `.wp-body ${sel}`) });

const prefixRules = item => {
    switch (item.type) {
        case 'rule':
            return prefixSelectors(item);
        case 'media':
            return { ...item, rules: item.rules.map(prefixRules) };
        case 'comment':
        case 'keyframes':
        case 'declaration':
        case 'font-face':
        case 'import':
        case 'charset':
        default:
            return item;
    }
};

export default ({ config, wpCssTransform }) => {
    const parsed = url.parse(config.webAddress);
    return proxy(config.wpURL, {
        userResDecorator:     (proxyRes, proxyResData, userReq) => {
            if (!wpCssTransform) {
                return proxyResData;
            }

            const mimeType = _get(proxyRes, 'headers.content-type', '');
            if (mimeType.indexOf('text/css') === 0) {
                try {
                    const ref = _get(userReq, 'headers.referer', '');
                    if (ref && ref.indexOf('/wp-admin/') !== -1) {
                        return proxyResData;
                    }

                    const ast = cssParser.parse(proxyResData.toString());
                    ast.stylesheet.rules = ast.stylesheet.rules.map(prefixRules);
                    return cssParser.stringify(ast, { compress: true });
                } catch (err) {
                    console.error('Failed to prefix wp styles', err);
                    return proxyResData;
                }
            }

            return proxyResData;
        },
        proxyReqOptDecorator: (proxyReqOpts) => {
            Object.assign(proxyReqOpts.headers, { host: parsed.host });
            return proxyReqOpts;
        },

        limit: '50mb',
    });
};
