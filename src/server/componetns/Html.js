import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

/* eslint-disable react/no-danger */
// eslint-disable-next-line max-len
const fontURL = 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&amp;subset=cyrillic,cyrillic-ext,latin-ext&display=swap';

const Html = ({ title, description, style, scripts, app, children, lang, meta, googleTrackingId }) => (
    <html className="no-js" lang={lang}>
    <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {meta.map((item, idx) => (
            <meta key={idx} {...item} /> // eslint-disable-line react/no-array-index-key
        ))}
        {scripts.map(script => (
            <link key={script} rel="preload" href={script} as="script" />
        ))}
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link href={fontURL} rel="stylesheet" />
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/balloon-css/0.5.0/balloon.min.css"
        />
        {style}
    </head>
    <body>
    <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
    <script dangerouslySetInnerHTML={{ __html: `window.App=${serialize(app)}` }} />
    {scripts.map(script => <script key={script} src={script} />)}
    {googleTrackingId && (
        <script
            dangerouslySetInnerHTML={{
                __html:
                    'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
                    `ga('create','${googleTrackingId}','auto');ga('send','pageview')`,
            }}
        />
    )}
    {googleTrackingId && (<script src="https://www.google-analytics.com/analytics.js" async defer />)}
    </body>
    </html>
);

Html.propTypes = {
    title:            PropTypes.string.isRequired,
    description:      PropTypes.string.isRequired,
    style:            PropTypes.node,
    scripts:          PropTypes.arrayOf(PropTypes.string.isRequired),
    app:              PropTypes.object, // eslint-disable-line
    children:         PropTypes.string.isRequired,
    lang:             PropTypes.string.isRequired,
    meta:             PropTypes.arrayOf(PropTypes.shape()),
    googleTrackingId: PropTypes.string,
};

Html.defaultProps = {
    scripts:          [],
    meta:             [],
    style:            null,
    googleTrackingId: null,
};

export default Html;
