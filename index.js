import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

export const javaScriptRecommended = [
  tseslint.configs.eslintRecommended,
  {
    rules: {
      'no-unused-labels': 'warn',
      'prefer-const': 'warn',
      'no-unused-private-class-members': 'warn',
    },
    ignores: ['dist/**/*'],
  },
]

export const typeScriptRecommended = [
  ...tseslint.configs.recommended,
  {
    rules: {
      'prefer-const': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/prefer-as-const': 'warn',
    },
    ignores: ['dist/**/*'],
  },
  {
    files: ['**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
]

export const stylisticRecommended = [
  stylistic.configs['recommended-flat'],
  {
    rules: {
      ...applyLevel('warn', stylistic.configs['recommended-flat']['rules']),
      '@stylistic/max-len': ['warn', { code: 132 }],
      '@stylistic/indent': ['warn', 2],
    },
    ignores: ['dist/**/*'],
  },
]

function applyLevel(level, rules) {
  return Object.keys(rules).reduce((rules, ruleName) => {
    const rule = rules[ruleName]
    rules[ruleName] = rule instanceof Array
      ? [level, ...rule.slice(1)]
      : level
    return rules
  }, {})
}
