import globals from 'globals';
import typescriptEslintParser from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import astroPlugin from 'eslint-plugin-astro';
import astroParser from 'astro-eslint-parser';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
// import prettierConfig from 'eslint-config-prettier'; // Prettier rules are often best handled by running Prettier separately

export default [
  // Global configuration applies to all files
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/.astro/**'], // Ignore common build/dependency folders
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // ...globals.browser, // Temporarily removed due to whitespace issue
        ...globals.node,
        ...globals.es2021,
        // Manually add essential browser globals if needed, e.g.:
        // window: 'readonly',
        // document: 'readonly',
        // fetch: 'readonly'
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      'jsx-a11y': jsxA11yPlugin,
      // 'prettier': prettierPlugin, // If using eslint-plugin-prettier
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // General rules previously in the root 'rules' section
      // 'prettier/prettier': 'off', // Turn off prettier rules if handled by the prettier CLI/plugin separately
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/no-autofocus': 'warn',
      // Include recommended rules - equivalent to 'extends' in old config
      ...typescriptEslintPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      // ...prettierConfig.rules, // Apply prettier rules disabling
    },
  },

  // Configuration for Astro files
  {
    files: ['**/*.astro'],
    plugins: {
      astro: astroPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node, // Add node globals for Astro files if needed
        // ...globals.browser, // Temporarily removed
        // Manually add essential browser globals for Astro context if needed
      },
      parser: astroParser,
      parserOptions: {
        parser: typescriptEslintParser,
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {
      ...astroPlugin.configs.recommended.rules, // Apply Astro recommended rules
      'jsx-a11y/anchor-is-valid': 'off', // Example override for Astro
      // Add other Astro-specific rule overrides here
    },
  },

  // Configuration for TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing for TSX
        },
      },
    },
    rules: {
      // Apply TS recommended rules again specifically for these files if needed, or rely on global config
      // ...typescriptEslintPlugin.configs.recommended.rules,
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // Add other TS/TSX specific rule overrides here
    },
  },

  // Configuration for JavaScript/JSX files (if any outside Astro/TS)
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Apply relevant rules, e.g., accessibility for JSX
      // ...jsxA11yPlugin.configs.recommended.rules,
      // Add other JS/JSX specific rule overrides here
    },
  },
];
