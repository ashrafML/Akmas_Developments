import nx from '@nx/eslint-plugin';

export default [
  // =====================================================
  // Nx base configs (KEEP)
  // =====================================================
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],

  // =====================================================
  // Ignore patterns
  // =====================================================
  {
    ignores: [
      '**/dist/**',
      '**/out-tsc/**',
      '**/.nx/**',
      '**/node_modules/**',
      '**/vitest.config.*.timestamp*',
      '**/vite.config.*.timestamp*',
    ],
  },

  // =====================================================
  // Nx Module Boundaries (Graph-level governance)
  // =====================================================
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],

          depConstraints: [
            // ---------------------------------------------
            // EVENT BUS MUST BE APP-AGNOSTIC
            // ---------------------------------------------
            {
              sourceTag: 'type:event-bus',
              notDependOnLibsWithTags: ['type:app'],
            },

            // ---------------------------------------------
            // APPS MUST NOT DEPEND ON APPS
            // (MF host → remote allowed via runtime only)
            // ---------------------------------------------
            {
              sourceTag: 'type:app',
              notDependOnLibsWithTags: ['type:app'],
            },

            // ---------------------------------------------
            // SHARED LIBS ARE SAFE
            // ---------------------------------------------
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
          ],
        },
      ],
    },
  },

  // =====================================================
  // MF COMMUNICATION RULE
  // =====================================================
  {
    files: ['apps/**/src/**/*.ts'],
    rules: {
      // ❌ BLOCK MF-TO-MF DIRECT IMPORTS
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['apps/*', '*/Routes'],
              message:
                'Direct MF-to-MF imports are forbidden. Use the event-bus lib.',
            },
          ],
        },
      ],
    },
  },

  // =====================================================
  // Catch-all (safe extension point)
  // =====================================================
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    rules: {
      // Extend here safely if needed
    },
  },
];
