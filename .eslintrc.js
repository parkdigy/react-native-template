module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@pdg/react-hook/recommended',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-unnecessary-type-constraint': 'off',
    'jsx-quotes': 'off',
    'react/display-name': 'off',
    'react/jsx-no-undef': 'off',
    'react/jsx-key': 'off',
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 'error',
    'react-native/no-inline-styles': 'off',
    'react-native/no-unused-styles': 'error',
    'react-native/split-platform-components': 'error',
    'react-native/no-color-literals': 'error',
    'react-native/no-single-element-style-arrays': 'error',
    'eslint-comments/no-unlimited-disable': 'off',
    'import/extensions': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/export': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector:
          "TSTypeReference[typeName.left.name='React'][typeName.right.name='FC'], TSTypeReference[typeName.name='FC']",
        message: 'React.FC 사용이 금지되었습니다.',
      },
      {
        selector:
          "CallExpression[callee.object.name='React'][callee.property.name='memo'], CallExpression[callee.name='memo']",
        message: 'React.memo 사용이 금지되었습니다.',
      },
      {
        selector:
          "CallExpression[callee.object.name='React'][callee.property.name='forwardRef'], CallExpression[callee.name='forwardRef']",
        message: 'React.forwardRef 사용이 금지되었습니다.',
      },
    ],
  },
};
