import React from 'react';
import ReactDOM from 'react-dom/server';
import util from 'util';
import PlainErrorPage from '../componetns/Errors/PlainErrorPage';
import Html from '../componetns/Html';

// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
    console.error({ url: req.url, message: util.inspect(err) });
    const html = ReactDOM.renderToStaticMarkup(
        <Html lang="en" title="Internal Server Error" description={err.message}>
            {ReactDOM.renderToString(<PlainErrorPage error={err} />)}
        </Html>
    );
    res.status(err.status || 500);
    res.send(`<!doctype html>${html}`);
};
