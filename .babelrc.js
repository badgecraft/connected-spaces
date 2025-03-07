/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

// Babel configuration
// https://babeljs.io/docs/usage/api/
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
        '@babel/preset-flow',
        '@babel/preset-react',
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
    ],
    ignore:  ['node_modules', 'build'],
};
