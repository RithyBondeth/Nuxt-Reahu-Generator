<script setup lang="ts">
import DOMPurify from 'dompurify'
import MarkdownIt from 'markdown-it'

const props = defineProps<{
  source: string
  theme: 'light' | 'dark'
}>()

// `html: true` is required — centering, banners, and side-by-side stat cards all
// depend on the raw-HTML subset GitHub permits inside Markdown.
const md = new MarkdownIt({ html: true, linkify: true })

/**
 * Allowing raw HTML means user-authored markup reaches `v-html`, so it goes
 * through DOMPurify first. This matters more than it looks: share links carry a
 * whole document in the URL fragment, so this content is not always the
 * viewer's own.
 */
const html = computed(() => {
  const rendered = md.render(props.source)

  // Server-rendered template previews only contain Markdown produced by our
  // typed renderers. Shared and edited documents are sanitized in the browser.
  if (import.meta.server) return rendered

  return DOMPurify.sanitize(rendered, {
    ADD_TAGS: ['picture', 'source'],
    ADD_ATTR: ['align', 'width', 'height', 'srcset', 'media', 'target']
  })
})
</script>

<template>
  <!-- `html` is DOMPurify-sanitized above. vue/no-v-html is switched off for
       this file only — see eslint.config.mjs. -->
  <div
    class="readme-body"
    :class="theme === 'dark' ? 'readme-dark' : 'readme-light'"
    v-html="html"
  />
</template>
