module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:promise/recommended',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'promise/always-return': 'off',
    'no-unused-vars': ['warn', { vars: 'all', args: 'none' }],
    'object-shorthand': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}

// module.exports = {
//   root: true,
//   env: {
//     browser: true,
//     node: true
//   },
//   parserOptions: {
//     parser: 'babel-eslint'
//   },
//   extends: [
//     'standard',
//     'plugin:vue/recommended',
//     'plugin:prettier/recommended'
//   ],
//   // required to lint *.vue files
//   plugins: ['vue', 'prettier'],
//   // add your custom rules here
//   rules: {
//     'prettier/prettier': ['error', { endOfLine: 'auto' }],
//     'no-unused-vars': ['warn', { vars: 'all', args: 'none' }],
//     'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
//     'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
//     'vue/no-v-html': 'off',
//     'vue/max-attributes-per-line': [
//       'error',
//       {
//         singleline: 3,
//         multiline: {
//           max: 1,
//           allowFirstLine: true
//         }
//       }
//     ]
//   }
// }
