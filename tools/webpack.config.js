import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import WebpackAssetsManifest from 'webpack-assets-manifest';
import nodeExternals from 'webpack-node-externals';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import overrideRules from './lib/overrideRules';
import pkg from '../package.json';
import LocalesPlugin, { getPoFilePath } from './locales';

const ROOT_DIR = path.resolve(__dirname, '..');
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);
const SRC_DIR = resolvePath('src');
const BUILD_DIR = resolvePath('build');
const BUILD_CACHE_DIR = resolvePath('build_cache');
const I18N_DIR = resolvePath('./src/i18n');

const isDebug = !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose');
const isAnalyze =
    process.argv.includes('--analyze') || process.argv.includes('--analyse');

const reScript = /\.js$/;
const reGraphql = /\.(graphql|gql)$/;
const reStyle = /\.css$/;
const reImage = /\.(gif|jpg|jpeg|png|svg)$/;
const reFont = /\.(ttf|woff|woff2)$/;

const staticAssetName = isDebug ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]';
const locales = ['en'];

//
// Common configuration chunk to be used for both
// client-side (client.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------

const createConfig = ({ type = null, locale } = {}) => {
    const lp = locale ? `_${locale}` : '';
    return {
        context: ROOT_DIR,

        mode: isDebug ? 'development' : 'production',

        output: {
            path:       resolvePath(BUILD_DIR, 'public/assets'),
            publicPath: '/assets/',
            pathinfo:   isVerbose,

            filename:                      isDebug ? `[name]${lp}.js` : `[name]${lp}.[chunkhash:8].js`,
            chunkFilename:                 isDebug ? `[name]${lp}.chunk.js` : `[name]${lp}.[chunkhash:8].chunk.js`,
            // Point sourcemap entries to original disk location (format as URL on Windows)
            devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
        },

        resolve: {
            // Allow absolute paths in imports, e.g. import Button from 'components/Button'
            // Keep in sync with .flowconfig and .eslintrc
            modules:  ['node_modules', 'src'],
            symlinks: false,
        },

        module: {
            // Make missing exports an error instead of warning
            strictExportPresence: true,

            rules: [
                // Rules for JS / JSX
                {
                    test:    reScript,
                    include: [
                        SRC_DIR,
                        resolvePath('tools'),
                        resolvePath('node_modules/strip-indent'),
                        resolvePath('node_modules/query-string'),
                        resolvePath('node_modules/strict-uri-encode'),
                        resolvePath('../ui'),
                        resolvePath('../server'),
                    ],
                    loader:  'babel-loader',
                    options: {
                        // https://github.com/babel/babel-loader#options
                        // cacheDirectory: isDebug,
                        cacheDirectory: BUILD_CACHE_DIR,

                        // https://babeljs.io/docs/usage/options/
                        babelrc: false,
                        presets: [
                            // A Babel preset that can automatically determine the Babel plugins and polyfills
                            // https://github.com/babel/babel-preset-env
                            [
                                '@babel/preset-env',
                                {
                                    targets:     {
                                        browsers: pkg.browserslist,
                                        // forceAllTransforms: !isDebug, // for UglifyJS
                                    },
                                    modules:     false,
                                    useBuiltIns: false,
                                    debug:       false,
                                },
                            ],
                            // Flow
                            // https://github.com/babel/babel/tree/master/packages/babel-preset-flow
                            '@babel/preset-flow',
                            // JSX
                            // https://github.com/babel/babel/tree/master/packages/babel-preset-react
                            ['@babel/preset-react', { development: isDebug }],
                        ],
                        plugins: [
                            '@babel/plugin-syntax-dynamic-import',
                            '@babel/plugin-syntax-import-meta',
                            '@babel/plugin-proposal-async-generator-functions',
                            ['@babel/plugin-proposal-class-properties', { loose: false }],
                            ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: false }],
                            '@babel/plugin-proposal-optional-catch-binding',
                            '@babel/plugin-proposal-unicode-property-regex',
                            '@babel/plugin-proposal-function-sent',
                            '@babel/plugin-proposal-export-namespace-from',
                            '@babel/plugin-proposal-numeric-separator',
                            '@babel/plugin-proposal-throw-expressions',
                            [
                                'emotion',
                                {
                                    // sourceMap is on by default but source maps are dead code eliminated in production
                                    sourceMap:           true,
                                    autoLabel:           process.env.NODE_ENV !== 'production',
                                    labelFormat:         '[local]',
                                    cssPropOptimization: true
                                }
                            ],
                            ...(type === 'client' ? [
                                [
                                    'babel-plugin-ttag',
                                    {
                                        resolve: {
                                            translations: getPoFilePath({ name: locale, basePath: I18N_DIR }).poFilePath
                                        },
                                    },
                                ],
                            ] : []),
                            // Treat React JSX elements as value types and hoist them to the highest scope
                            // https://github.com/babel/babel/tree/master/packages/
                            // babel-plugin-transform-react-constant-elements
                            ...(isDebug ? [] : ['@babel/transform-react-constant-elements']),
                            // Replaces the React.createElement function with one that is more optimized for production
                            // https://github.com/babel/babel/tree/master/packages/
                            // babel-plugin-transform-react-inline-elements
                            ...(isDebug ? [] : ['@babel/transform-react-inline-elements']),
                            // Remove unnecessary React propTypes from the production build
                            // https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types
                            ...(isDebug ? [] : ['transform-react-remove-prop-types']),
                        ],
                    },
                },

                // Rules for GraphQL
                {
                    test:    reGraphql,
                    exclude: /node_modules/,
                    loader:  'graphql-tag/loader',
                },

                {
                    test:    reFont,
                    loader:  'file-loader',
                    options: {
                        name: staticAssetName,
                    },
                },

                // Rules for Style Sheets
                {
                    test:   reStyle,
                    loader: 'raw-loader',
                },

                // Rules for images
                {
                    test:  reImage,
                    oneOf: [
                        // Inline lightweight images into CSS
                        {
                            issuer: reStyle,
                            oneOf:  [
                                // Inline lightweight SVGs as UTF-8 encoded DataUrl string
                                {
                                    test:    /\.svg$/,
                                    loader:  'svg-url-loader',
                                    options: {
                                        name:  staticAssetName,
                                        limit: 4096, // 4kb
                                    },
                                },

                                // Inline lightweight images as Base64 encoded DataUrl string
                                {
                                    loader:  'url-loader',
                                    options: {
                                        name:  staticAssetName,
                                        limit: 4096, // 4kb
                                    },
                                },
                            ],
                        },

                        {
                            test:    /\.svg$/,
                            loader:  'svg-url-loader',
                            options: {
                                name:     staticAssetName,
                                limit:    12288, // 12kb
                                encoding: 'string',
                            },
                        },

                        // Or return public URL to image resource
                        {
                            loader:  'file-loader',
                            options: {
                                name: staticAssetName,
                            },
                        },
                    ],
                },

                // Convert plain text into JS module
                {
                    test:   /\.txt$/,
                    loader: 'raw-loader',
                },

                // Convert Markdown into HTML
                {
                    test:   /\.md$/,
                    loader: path.resolve(__dirname, './lib/markdown-loader.js'),
                },

                // Return public URL for all assets unless explicitly excluded
                // DO NOT FORGET to update `exclude` list when you adding a new loader
                {
                    exclude: [
                        reScript,
                        reStyle,
                        reImage,
                        reGraphql,
                        reFont,
                        /\.json$/,
                        /\.txt$/,
                        /\.md$/,
                    ],
                    loader:  'file-loader',
                    options: {
                        name: staticAssetName,
                    },
                },

                // Exclude dev modules from production build
                ...(isDebug
                    ? []
                    : [
                        {
                            test:   resolvePath(
                                'node_modules/react-deep-force-update/lib/index.js',
                            ),
                            loader: 'null-loader',
                        },
                    ]),
            ],
        },

        // Don't attempt to continue if there are any errors.
        bail: !isDebug,

        cache: isDebug,

        // Specify what bundle information gets displayed
        // https://webpack.js.org/configuration/stats/
        stats: {
            cached:       isVerbose,
            cachedAssets: isVerbose,
            chunks:       isVerbose,
            chunkModules: isVerbose,
            colors:       true,
            hash:         isVerbose,
            modules:      isVerbose,
            reasons:      isDebug,
            timings:      true,
            version:      isVerbose,
        },

        // Choose a developer tool to enhance debugging
        // https://webpack.js.org/configuration/devtool/#devtool
        devtool: isDebug ? 'cheap-module-inline-source-map' : 'source-map',
    };
};
//
// Configuration for the client-side bundle (client.js)
// -----------------------------------------------------------------------------

const createClientConfig = ({ locale, cleanManifests = false }) => ({
    ...createConfig({ type: 'client', locale }),

    name:   'client',
    target: 'web',

    entry: {
        client: ['@babel/polyfill', './src/client.js'],
    },

    plugins: [
        // Define free variables
        // https://webpack.js.org/plugins/define-plugin/
        new webpack.DefinePlugin({
            'process.env.BROWSER': true,
            __DEV__:               isDebug,
        }),

        // Emit a file with assets paths
        // https://github.com/webdeveric/webpack-assets-manifest#options
        new WebpackAssetsManifest({
            output:      `${BUILD_DIR}/asset-manifest.json`,
            publicPath:  true,
            writeToDisk: true,
            customize:   (entry) => {
                // You can prevent adding items to the manifest by returning false.
                if (entry.key.toLowerCase().endsWith('.map')) {
                    return false;
                }

                return entry;
            },
            done:        (manifest, stats) => {
                // Write chunk-manifest.json.json
                const chunkFileName = `${BUILD_DIR}/chunk-manifest.json`;
                try {
                    const fileFilter = file => !file.endsWith('.map');
                    const addPath = file => manifest.getPublicPath(file);
                    const stored = cleanManifests ? {} : JSON.parse(fs.readFileSync(chunkFileName));
                    const chunkFiles = stats.compilation.chunkGroups.reduce((acc, c) => {
                        const chunkName = `${c.name}:${locale}`;
                        acc[chunkName] = [
                            ...(acc[chunkName] || []),
                            ...c.chunks.reduce(
                                (files, cc) => [
                                    ...files,
                                    ...cc.files.filter(fileFilter).map(addPath),
                                ],
                                [],
                            ),
                        ];
                        return acc;
                    }, stored);
                    fs.writeFileSync(chunkFileName, JSON.stringify(chunkFiles, null, 2));
                } catch (err) {
                    console.error(`ERROR: Cannot write ${chunkFileName}: `, err);
                    if (!isDebug) process.exit(1);
                }
            },
        }),
        ...(isDebug
            ? []
            : [
                // Webpack Bundle Analyzer
                // https://github.com/th0r/webpack-bundle-analyzer
                ...(isAnalyze ? [new BundleAnalyzerPlugin()] : []),
            ]),
    ],

    // Move modules that occur in multiple entry chunks to a new entry chunk (the commons chunk).
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    test:   /[\\/]node_modules[\\/]/,
                    name:   'vendors',
                },
            },
        },
    },

    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    // https://webpack.js.org/configuration/node/
    // https://github.com/webpack/node-libs-browser/tree/master/mock
    node: {
        fs:  'empty',
        net: 'empty',
        tls: 'empty',
    },
});

//
// Configuration for the server-side bundle (server.js)
// -----------------------------------------------------------------------------
const config = createConfig({ type: 'server' });
const serverConfig = {
    ...config,

    name:   'server',
    target: 'node',

    entry: {
        server: ['@babel/polyfill', './src/server.js'],
    },

    output: {
        ...config.output,
        path:          BUILD_DIR,
        filename:      '[name].js',
        chunkFilename: 'chunks/[name].js',
        libraryTarget: 'commonjs2',
    },

    // Webpack mutates resolve object, so clone it to avoid issues
    // https://github.com/webpack/webpack/issues/4817
    resolve: {
        ...config.resolve,
    },

    module: {
        ...config.module,

        rules: overrideRules(config.module.rules, rule => {
            // Override babel-preset-env configuration for Node.js
            if (rule.loader === 'babel-loader') {
                return {
                    ...rule,
                    options: {
                        ...rule.options,
                        presets: rule.options.presets.map(
                            preset =>
                                preset[0] !== '@babel/preset-env'
                                    ? preset
                                    : [
                                        '@babel/preset-env',
                                        {
                                            targets:     {
                                                node: pkg.engines.node.match(/(\d+\.?)+/)[0],
                                            },
                                            modules:     false,
                                            useBuiltIns: false,
                                            debug:       false,
                                        },
                                    ],
                        ),
                    },
                };
            }

            // Override paths to static assets
            if (
                rule.loader === 'file-loader' ||
                rule.loader === 'url-loader' ||
                rule.loader === 'svg-url-loader'
            ) {
                return {
                    ...rule,
                    options: {
                        ...rule.options,
                        emitFile: false,
                    },
                };
            }

            return rule;
        }),
    },

    externals: [
        './chunk-manifest.json',
        './asset-manifest.json',
        './locale-manifest.json',
        nodeExternals({
            whitelist: [reStyle, reImage],
        }),
    ],

    plugins: [
        // Define free variables
        // https://webpack.js.org/plugins/define-plugin/
        new webpack.DefinePlugin({
            'process.env.BROWSER': false,
            __DEV__:               isDebug,
        }),

        // Adds a banner to the top of each generated chunk
        // https://webpack.js.org/plugins/banner-plugin/
        new webpack.BannerPlugin({
            banner:    'require("source-map-support").install();',
            raw:       true,
            entryOnly: false,
        }),
        new LocalesPlugin({ basePath: I18N_DIR, locales, buildDir: BUILD_DIR }),
    ],

    // Do not replace node globals with polyfills
    // https://webpack.js.org/configuration/node/
    node: {
        console:    false,
        global:     false,
        process:    false,
        Buffer:     false,
        __filename: false,
        __dirname:  false,
    },
};

export default [
    createClientConfig({ locale: locales[0], cleanManifests: true }),
    serverConfig,
    ...(locales.slice(1).map(locale => createClientConfig({ locale }))),
];
