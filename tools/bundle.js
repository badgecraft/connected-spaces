/* eslint no-console: 0 */
import webpack from 'webpack';
import webpackConfig from './webpack.config';

const compile = (name, ...args) => new Promise((resolve, reject) => {
    console.info('compiling', name);
    console.time(name);
    webpack(...args).run((err, stats) => {
        if (err) {
            console.timeEnd(name);
            return reject(err);
        }

        // console.info(stats.toString(webpackConfig[0].stats));
        if (stats.hasErrors()) {
            console.timeEnd(name);
            return reject(new Error('Webpack compilation errors'));
        }

        console.timeEnd(name);
        return resolve();
    });
});

/**
 * Creates application bundles from the source files.
 */
async function bundle() {
    const [defaultClient, server, ...other] = webpackConfig;
    await compile('main', [defaultClient, server]);
    // eslint-disable-next-line no-restricted-syntax
    await other.reduce((p, cfg) => p
        .then((() => compile(cfg.output.filename, cfg))), Promise.resolve());
}

export default bundle;
