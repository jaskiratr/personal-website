import FMMode from 'frontmatter-markdown-loader/mode'
// import { getMatchedComponents } from './utils'

const md = require('markdown-it')({
  html: true,
  linkify: true,
  breaks: false,
  injected: true,
  typographer: true
})

md.use(require('markdown-it-emoji'))
  .use(require('markdown-it-meta'))
  .use(require('markdown-it-sub'))
  .use(require('markdown-it-sup'))
  .use(require('markdown-it-ins'))
  .use(require('markdown-it-mark'))
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-deflist'))
  .use(require('markdown-it-abbr'))
  .use(require('markdown-it-prism'))

// const base = 'gh-pages' === process.env.NODE_ENV ? '/vue-examples/' : '/';
export default {
  mode: 'universal',
  router: {
    // base: '/',
  },
  vue: {
    config: {
      productionTip: false
      // devtools: false
    }
  },
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_author || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=IBM+Plex+Mono:400,600|IBM+Plex+Sans:400,700|IBM+Plex+Serif:200,300,400,500'
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.6.3/css/all.css',
        integrity: 'sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/',
        crossorigin: 'anonymous'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['element-ui/lib/theme-chalk/index.css', '@/assets/css/prism-atom-dark.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/element-ui', '@/plugins/event-bus', '@/plugins/lazyload', '@/plugins/image-responsive'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/eslint-module'],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/style-resources', '@nuxtjs/axios', 'nuxt-purgecss'],
  styleResources: {
    sass: ['./assets/sass/*.sass']
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // ... other code ...// Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        options: {
          mode: [FMMode.VUE_COMPONENT],
          markdown(body) {
            return md.render(body)
          }
        }
      })
    }
  },
  generate: {
    // routes: dynamicMarkdownRoutes()
  },
  /*
   ** To support hot reloading for docker
   */
  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
}

// function dynamicMarkdownRoutes() {
//   return [].concat(
//     ...markdownPaths.map(mdPath => {
//       return glob
//         .sync(`${mdPath}/*.md`, { cwd: 'articles' })
//         .map(filepath => `/${mdPath}/${path.basename(filepath, '.md')}`)
//     })
//   )
// }
