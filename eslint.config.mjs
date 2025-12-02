import { dirname } from 'path';
import { fileURLToPath } from 'url';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import nextPlugin from '@next/eslint-plugin-next';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = [
    // Ignore patterns
    {
        ignores: [
            'src/shadcn/lib',
            'node_modules/**',
            '.next/**',
            'out/**',
            'build/**',
            '.next/**',
            'next-env.d.ts',
            'prisma/generated/**',
            'prisma/seed.ts',
            'eslint.config.mjs', // Exclude ESLint config from linting
        ],
    },

    // Base configs
    eslint.configs.recommended,

    // Global language options for all files
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser,
                React: 'readonly',
                JSX: 'readonly',
            },
            ecmaVersion: 2024,
            sourceType: 'module',
        },
    },

    // TypeScript configuration - spread the configs instead of using extends
    ...tseslint.configs.recommendedTypeChecked.map(config => ({
        ...config,
        files: ['**/*.ts', '**/*.tsx'],
    })),

    // TypeScript specific rules
    {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
            '@typescript-eslint': tseslint.plugin,
        },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                projectService: {
                    allowDefaultProject: ['*.js', '*.mjs'],
                },
                tsconfigRootDir: __dirname,
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        rules: {
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-argument': 'warn',
            '@typescript-eslint/no-floating-promises': 'warn',
        },
    },

    // Next.js configuration
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        plugins: {
            '@next/next': nextPlugin,
        },
        rules: {
            '@next/next/no-html-link-for-pages': 'error',
            '@next/next/no-img-element': 'warn',
            '@next/next/no-unwanted-polyfillio': 'warn',
            '@next/next/no-page-custom-font': 'warn',
            '@next/next/no-sync-scripts': 'warn',
            '@next/next/no-title-in-document-head': 'warn',
            '@next/next/google-font-display': 'warn',
            '@next/next/google-font-preconnect': 'warn',
            '@next/next/next-script-for-ga': 'warn',
            '@next/next/no-before-interactive-script-outside-document': 'warn',
            '@next/next/no-css-tags': 'warn',
            '@next/next/no-head-element': 'warn',
            '@next/next/inline-script-id': 'error',
            '@next/next/no-styled-jsx-in-document': 'warn',
        },
    },

    // React configuration
    {
        files: ['**/*.tsx', '**/*.jsx'],
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'react/jsx-props-no-spreading': 'off',
            'react/require-default-props': 'off',
            'react/button-has-type': 'warn',
            'react/jsx-filename-extension': [
                'warn',
                {
                    extensions: ['.tsx', '.jsx'],
                },
            ],
        },
    },

    // Import plugin configuration
    {
        plugins: {
            import: eslintPluginImport,
        },
        rules: {
            'import/order': [
                'warn',
                {
                    groups: [
                        ['builtin', 'external'],
                        ['internal', 'parent', 'sibling', 'index'],
                    ],
                    pathGroups: [
                        {
                            pattern: 'react',
                            group: 'external',
                            position: 'before',
                        },
                        {
                            pattern: 'next/**',
                            group: 'external',
                            position: 'before',
                        },
                        {
                            pattern: '@/**',
                            group: 'internal',
                            position: 'after',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['builtin'],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
            'import/prefer-default-export': 'off',
            'import/no-duplicates': 'warn',
            'no-restricted-imports': [
                'error',
                {
                    patterns: ['./*', '../*'],
                },
            ],
        },
        settings: {
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx'],
            },
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                },
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },
            },
        },
    },

    // Prettier configuration
    {
        plugins: {
            prettier: eslintPluginPrettier,
        },
        rules: {
            'prettier/prettier': 'error',
        },
    },

    // Code quality rules
    {
        rules: {
            // Indentation and formatting
            indent: 'off', // Handled by Prettier
            'no-tabs': 'error',
            'no-mixed-spaces-and-tabs': 'error',

            // Code quality
            'no-console': 'warn',
            'no-debugger': 'error',
            'no-unused-vars': 'off', // Using TypeScript version
            'prefer-const': 'error',
            'no-var': 'error',
            'object-shorthand': 'error',
            'prefer-template': 'error',

            // Best practices
            eqeqeq: ['error', 'always'],
            'no-eval': 'error',
            'no-implied-eval': 'error',
            'no-new-func': 'error',
            'no-return-await': 'error',
            'require-await': 'error',
        },
    },

    eslintConfigPrettier, // This should be last to override conflicting rules
];

export default eslintConfig;
