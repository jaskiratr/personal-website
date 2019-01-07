module.exports = {
  plugins: ['node_modules/jsdoc-vuejs', 'plugins/markdown'],
  source: {
    include: [
      'pages/',
      'pages/admin',
      'components/',
      'components/sections',
      'mixins/',
      'plugins/',
      'services/',
      'middleware/',
      'store/',
      'README.md'
    ],
    includePattern: '.+\\.(vue|js)$',
    excludePattern: '(node_modules/|docs)'
  },
  opts: {
    destination: './dist/docs/',
    encoding: 'utf8',
    template: 'jsdocs/braintree-template'
  },
  templates: {
    collapse: true,
    referenceTitle: 'Portfolio Docs',
    disableSort: true
    // default: {
    //   staticFiles: {
    //     include: ['jsdocs/']
    //   }
    // }
  },
  tags: {
    allowUnknownTags: true,
    dictionaries: ['jsdoc']
  }
}
