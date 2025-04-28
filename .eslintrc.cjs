module.exports = {
    // Specifies the ESLint parser for TypeScript
    parser: '@typescript-eslint/parser',
    extends: [
        // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:@typescript-eslint/recommended',
        // Uses the recommended rules from eslint-plugin-astro
        'plugin:astro/recommended',
        // Uses the recommended rules from eslint-plugin-jsx-a11y
        'plugin:jsx-a11y/recommended',
        // Enables eslint-config-prettier to disable ESLint rules that would conflict with Prettier
        'prettier',
    ],
    plugins: [
        // Enables eslint-plugin-jsx-a11y
        'jsx-a11y',
    ],
    parserOptions: {
        // Allows for the parsing of modern ECMAScript features
        ecmaVersion: 'latest',
        // Allows for the use of imports
        sourceType: 'module',
        // Allows for the parsing of JSX
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        // Enables browser global variables
        browser: true,
        // Enables Node.js global variables and Node.js scoping.
        node: true,
        // Enables ES2021 global variables
        es2021: true,
    },
    overrides: [
        {
            // Define the configuration for `.astro` file.
            files: ['*.astro'],
            // Allows Astro components to be parsed.
            parser: 'astro-eslint-parser',
            // Parse the script in `.astro` as TypeScript by adding the following configuration.
            parserOptions: {
                parser: '@typescript-eslint/parser',
                extraFileExtensions: ['.astro'],
            },
            rules: {
                // Override rules specific to Astro files here
                // Example: 'astro/no-set-html-directive': 'error'
                'jsx-a11y/anchor-is-valid': 'off', // Often not applicable in Astro components
            },
        },
        {
            // Define the configuration for `.ts` and `.tsx` files.
            files: ['*.ts', '*.tsx'],
            parser: '@typescript-eslint/parser',
            extends: ['plugin:@typescript-eslint/recommended'],
            rules: {
                // Override rules specific to TypeScript files here
                '@typescript-eslint/no-unused-vars': [
                    'warn',
                    { argsIgnorePattern: '^_' },
                ],
                '@typescript-eslint/explicit-module-boundary-types': 'off', // Allow inferred return types
            },
        },
        {
            // Define the configuration for `.jsx` and `.js` files.
            files: ['*.js', '*.jsx'],
            extends: ['plugin:jsx-a11y/recommended'], // Apply accessibility rules
            rules: {
                // Override rules specific to JavaScript/JSX files here
            },
        },
    ],
    settings: {
        react: {
            version: 'detect', // Automatically detect the React version
        },
    },
    rules: {
        // General rules can be added or overridden here
        'prettier/prettier': 'off', // Turn off prettier rules handled by the prettier CLI
        'no-unused-vars': 'warn', // Warn about unused variables
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Specifically for TS
        'react/prop-types': 'off', // Disable prop-types rule, especially if using TypeScript
        'react/react-in-jsx-scope': 'off', // Not needed with newer React/JSX transforms
        'jsx-a11y/alt-text': 'warn', // Warn for missing alt text on images
        'jsx-a11y/no-autofocus': 'warn', // Warn against using autofocus
    },
};
