module.exports = {
  plugins: ['node_modules/jsdoc-vuejs', 'plugins/markdown'],
  source: {
    include: ['pages/', 'components/', 'components/sections', 'README.md'],
    includePattern: '\\.(vue|js)$',
    excludePattern: '(node_modules/|docs)'
  },
  opts: {
    encoding: 'utf8',
    template: 'jsdocs/braintree-template',
    destination: './docs/'
  },
  templates: {
    collapse: true,
    referenceTitle: 'Portfolio Docs'
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

// module.exports = {
//   plugins: ['node_modules/jsdoc-vuejs', 'plugins/markdown'],
//   source: {
//     include: ['pages/', 'components/', 'components/sections/', 'README.md'],
//     includePattern: '\\.(vue|js)$'
//   },
//   opts: {
//     encoding: 'utf8',
//     template: 'node_modules/tui-jsdoc-template'
//   },
//   templates: {
//     default: {
//       staticFiles: {
//         include: ['jsdocs/']
//       }
//     },
//     css: ['styles/custom.css'],
//     name: 'Portfolio Docs',
//     footerText: 'Made with love',
//     logo: {
//       url: 'profile.png',
//       width: '30px',
//       height: '30px'
//     }
//   }
// }
