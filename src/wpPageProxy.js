import _get from 'lodash/get';
import proxy from 'express-http-proxy';
import cheerio from 'cheerio';
import url from 'url';
import config from './config';

const parsed = url.parse(config.webAddress);

export default (html, ...args) => {
    proxy(config.wpURL, {
        userResDecorator:     (proxyRes, proxyResData) => {
            if (proxyRes.statusCode === 404) {
                return html;
            }
            const mimeType = _get(proxyRes, 'headers.content-type', '');

            const isHtml = mimeType.indexOf('text/html') === 0;
            if (proxyRes.statusCode !== 200 || !isHtml) {
                return proxyResData;
            }

            const node = cheerio.load(html);
            const wp = cheerio.load(proxyResData);
            const title = wp('title').html() || '';

            wp('#header-container').remove();
            wp('#footer').remove();

            node('#not-found').html(wp('body').html());
            node('#not-found').removeClass().addClass('wp-body');
            node('#not-found').removeAttr('id');

            node('head').append(wp('head').html());
            node('title').html(title);

            node('body').attr('data-no-client', '1');

            return node.html();
        },
        proxyReqOptDecorator: (proxyReqOpts) => {
            Object.assign(proxyReqOpts.headers, { host: parsed.host });
            return proxyReqOpts;
        },

        limit: '10mb',
    })(...args);
}
