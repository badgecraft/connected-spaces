const path = require('path');
// ESLint configuration
// http://eslint.org/docs/user-guide/configuring
module.exports = {
    parser: 'babel-eslint',

    extends: [
        'airbnb',
        'prettier',
        'prettier/react',
    ],

    plugins: ['prettier'],

    globals: {
        __DEV__: true,
    },

    env: {
        browser: true,
    },

    rules: {
        quotes:                              ['warn', 'single', { allowTemplateLiterals: true }],
        // Forbid the use of extraneous packages
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
        'import/no-extraneous-dependencies': ['error', { packageDir: path.resolve(__dirname) }],

        // Recommend not to leave any console.log in your code
        // Use console.error, console.warn and console.info instead
        // https://eslint.org/docs/rules/no-console
        'no-console': [
            'error',
            {
                allow: ['warn', 'error', 'info'],
            },
        ],

        // Allow only special identifiers
        // https://eslint.org/docs/rules/no-underscore-dangle
        'no-underscore-dangle': [
            'error',
            {
                allow: ['__typename'],
            },
        ],

        // Prefer destructuring from arrays and objects
        // http://eslint.org/docs/rules/prefer-destructuring
        'prefer-destructuring': [
            'error',
            {
                VariableDeclarator:   {
                    array:  false,
                    object: true,
                },
                AssignmentExpression: {
                    array:  false,
                    object: false,
                },
            },
            {
                enforceForRenamedProperties: false,
            },
        ],

        // Ensure <a> tags are valid
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components:  ['Link'],
                specialLink: ['to'],
                aspects:     ['noHref', 'invalidHref', 'preferButton'],
            },
        ],

        // Allow .js files to use JSX syntax
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
        'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],

        // Functional and class components are equivalent from React’s point of view
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
        'react/prefer-stateless-function': 'off',

        // ESLint plugin for prettier formatting
        // https://github.com/prettier/eslint-plugin-prettier
        // 'prettier/prettier': 'error',

        'max-len':                      ['warn', 120],
        // todo re-enable once .range on null is fixed
        // indent:            ['error', 4, { SwitchCase: 1 }],
        indent:                         'off',
        'linebreak-style':              ['error', 'unix'],
        'react/jsx-props-no-spreading': 'off',
    },

    settings: {
        // Allow absolute paths in imports, e.g. import Button from 'components/Button'
        // https://github.com/benmosher/eslint-plugin-import/tree/master/resolvers
        'import/resolver': {
            node: {
                moduleDirectory: ['node_modules', 'src'],
            },
        },
    },
};
