// https://nuxt.com/docs/api/configuration/nuxt-config
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

  routeRules: {
    // Landing page is static — good for SEO and free to serve.
    '/': { prerender: true },
    // The builder reads localStorage + the URL hash on boot. Rendering it on the
    // server would hydrate against state the server cannot see, so it is SPA-only.
    '/build': { ssr: false }
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
