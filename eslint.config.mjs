// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    // The README preview must render the raw-HTML subset GitHub allows inside
    // Markdown, so `v-html` is unavoidable there. Its input is run through
    // DOMPurify first (see ReadmePreview.vue). Scoped to this one file so the
    // rule keeps protecting the rest of the app.
    files: ['app/components/readme/ReadmePreview.vue'],
    rules: {
      'vue/no-v-html': 'off'
    }
  }
)
