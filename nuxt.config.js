import colors from 'vuetify/es5/util/colors'
const client = require('./plugins/contentful').default

require('dotenv').config()

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-blog',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    'plugins/components',
    'plugins/contentful',
    'plugins/prism'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/markdownit'
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    defaultAssets: {
      icons: 'mdiSvg'
    },
    optionsPath: './vuetify.options.js',
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_BLOG_POST_TYPE_ID: process.env.CTF_BLOG_POST_TYPE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,

    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
    SITE_NAME: process.env.SITE_NAME,
    TWITTER_ACCOUNT: process.env.TWITTER_ACCOUNT,
  },

  router: {
    middleware: [
      'getContentful'
    ]
  },

  axios: {},

  markdownit: {
    injected: true,
    breaks: true,
    typography: true,
    use: [
      ['markdown-it-table-of-contents', {
        includeLevel: [2],
        containerHeaderHtml: '<div class="toc-container-header">目次</div>'
      }]
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  generate: {
    dir: 'public',
    routes() {
      return Promise.all([
        client.getEntries({
          content_type: process.env.CTF_BLOG_POST_TYPE_ID
        }),
        client.getEntries({
          content_type: 'category'
        }),
        client.getEntries({
          content_type: 'tag'
        })
      ]).then(([ posts, categories ]) => {
        return [
          ...posts.items.map(post => {
            return { route: `posts/${post.fields.slug}`, payload: post }
          }),
          ...categories.items.map((category) => {
            return { route: `categories/${category.fields.slug}`, payload: category }
          }),
          ...categories.items.map((tag) => {
            return { route: `tags/${tag.fields.slug}`, payload: tag }
          })
        ]
      })
    }
  }

}
