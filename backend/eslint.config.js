import eslint from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';

export default [
    eslint.configs.recommended,
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2024,
            sourceType: 'module',
            globals: {
                ...globals.node,
                ...globals.browser
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        plugins: {
            react,
            prettier
        },
        settings: {
            react: {
                version: 'detect'
            }
        },
        rules: {
            'linebreak-style': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'no-unused-vars': 'warn',
            'no-console': 'off',
            'no-undef': 'error',
            indent: ['error', 4],
            quotes: ['off'],
            semi: ['error', 'always'],
            'comma-dangle': ['off'],
            'no-useless-escape': 'off',
            'brace-style': ['off'],
            'prettier/prettier': ['off']
        }
    }
];
