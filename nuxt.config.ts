// https://nuxt.com/docs/api/configuration/nuxt-config
import { SITE_INDEX_ROUTES } from './site.config'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@vueuse/nuxt'
  ],

  // Components are grouped into feature folders (`blocks/`, `readme/`) for
  // navigability, but keep flat names — `<BlockCard>`, not `<BlocksBlockCard>`.
  // Names must therefore stay unique across those folders.
  components: [
    { path: '~/components', pathPrefix: false }
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  // The graphite-and-lime interface is designed dark-first. Light mode remains
  // fully supported and can be selected from the persistent header control.
  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  },

  // Private server configuration. Override in production with
  // NUXT_TRUSTED_USER_COUNT without exposing the raw value to the client bundle.
  runtimeConfig: {
    trustedUserCount: 1000
  },

  routeRules: {
    // Landing page is static — good for SEO and free to serve.
    '/': { prerender: true },
    '/templates': { prerender: true },
    '/templates/**': { prerender: true },
    // The builder reads localStorage + the URL hash on boot. Rendering it on the
    // server would hydrate against state the server cannot see, so it is SPA-only.
    '/build': {
      ssr: false,
      headers: {
        'x-robots-tag': 'noindex, nofollow'
      }
    }
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    prerender: {
      routes: [
        ...SITE_INDEX_ROUTES,
        '/robots.txt',
        '/sitemap.xml'
      ]
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  fonts: {
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin']
    }
  }
})
