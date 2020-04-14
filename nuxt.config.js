import FMMode from 'frontmatter-markdown-loader/mode'
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
  .use(require('markdown-it-attrs'))
// Remember old renderer, if overridden, or proxy to default renderer
const defaultRender =
  md.renderer.rules.link_open ||
  function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }

md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
  // If you are sure other plugins can't add `target` - drop check below
  const aIndex = tokens[idx].attrIndex('target')

  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank']) // add new attribute
  } else {
    tokens[idx].attrs[aIndex][1] = '_blank' // replace value of existing attr
  }

  // pass token to default renderer.
  return defaultRender(tokens, idx, options, env, self)
}

export default {
  mode: 'universal',
  router: {
    base: process.env.BASE_URL || '/'
  },
  vue: {
    config: {
      productionTip: false
      // devtools: false
    }
  },
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  head: {
    titleTemplate: '%s - Jaskirat',
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
          'https://fonts.googleapis.com/css?family=IBM+Plex+Mono:400,600|IBM+Plex+Sans:400,500,600,700|IBM+Plex+Serif:200,300,400,500'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap'
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.6.3/css/all.css',
        integrity: 'sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/',
        crossorigin: 'anonymous'
      }
    ]
  },
  // Global CSS
  css: ['element-ui/lib/theme-chalk/index.css', '@/assets/css/prism-atom-dark.css'],
  styleResources: { sass: ['./assets/sass/*.sass'] },
  loading: { color: '#fff' }, // Progress bar color
  modules: ['@nuxtjs/style-resources', '@nuxtjs/axios', ['@nuxtjs/pwa', { icon: false }]],
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/event-bus',
    '@/plugins/lazyload',
    '@/plugins/image-responsive',
    { src: '@/plugins/video-responsive', mode: 'client' }
  ],
  buildModules: ['@nuxtjs/eslint-module'],
  build: {
    transpile: [/^element-ui/],
    extend(config, ctx) {
      // Run ESLint on save
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
          vue: { root: 'md-content' },
          markdown(body) {
            return md.render(body)
          }
        }
      })
    }
  },
  workbox: {
    cacheAssets: true,
    offlineAnalytics: true,
    runtimeCaching: [
      {
        urlPattern: new RegExp('/article'),
        handler: 'staleWhileRevalidate'
      },
      {
        urlPattern: 'https://fonts.(?:googleapis|gstatic).com/(.*)',
        handler: 'staleWhileRevalidate',
        strategyOptions: {
          cacheName: 'google-fonts',
          cacheExpiration: {
            maxEntries: 30,
            maxAgeSeconds: 300
          }
        }
      }
    ]
  },
  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
}
