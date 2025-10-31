module.exports = {
    root: true,
    parser: '@babel/eslint-parser',
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
            alias: {
                map: [['@', './src']],
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    env: {
        node: true,
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@next/next/recommended',
        'plugin:import/recommended',
        'plugin:jsx-a11y/recommended',
        'prettier',
    ],
    parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
        requireConfigFile: false,
        babelOptions: {
            presets: ['@babel/preset-react'],
        },
    },
    plugins: ['react', 'react-hooks', 'import', 'jsx-a11y'],
    rules: {
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'no-unused-vars': [
            'warn',
            { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
        'no-nested-ternary': 'off',
        'no-underscore-dangle': 'off',
        'no-unused-expressions': ['error', { allowTernary: true }],
        camelcase: 'off',

        'react/self-closing-comp': 'warn',
        'react/jsx-filename-extension': [
            'warn',
            { extensions: ['.js', '.jsx', '.tsx'] },
        ],
        'react/prop-types': 'off',
        'react/destructuring-assignment': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/no-array-index-key': 'off',
        'react/no-unescaped-entities': 'off',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'import/prefer-default-export': 'off',
        'import/order': [
            'warn',
            {
                groups: [
                    ['builtin', 'external'],
                    ['internal'],
                    ['parent', 'sibling', 'index'],
                ],
                'newlines-between': 'always',
                alphabetize: { order: 'asc', caseInsensitive: true },
            },
        ],
        'linebreak-style': ['error', 'unix'],
        semi: ['error', 'never'],
    },
}
