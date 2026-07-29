<script setup lang="ts">
const title = 'Reahu Generator'
const description = 'Compose a GitHub profile README from drag-and-drop blocks. Live preview, shareable links, download the Markdown. No account, no server.'

useHead({
  titleTemplate: chunk => (chunk ? `${chunk} · ${title}` : title),
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    // Tints mobile browser chrome with the eclipse navy from the logo.
    { name: 'theme-color', content: '#001038' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  title,
  description,
  ogType: 'website',
  ogSiteName: title,
  ogTitle: title,
  ogDescription: description,
  ogImage: '/og-image.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Reahu Generator',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: '/og-image.jpg'
})
</script>

<template>
  <UApp>
    <UHeader :ui="{ root: 'border-default/60' }">
      <template #left>
        <NuxtLink
          to="/"
          class="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <BrandMark />
        </NuxtLink>
      </template>

      <template #right>
        <UColorModeButton />

        <UButton
          to="/build"
          label="Open builder"
          trailing-icon="i-lucide-arrow-right"
          size="sm"
        />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <UFooter :ui="{ root: 'border-t border-default/60' }">
      <template #left>
        <p class="text-sm text-muted">
          Runs entirely in your browser · © {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <UButton
          to="https://github.com/RithyBondeth/Nuxt-Reahu-Generator"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="Source on GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </UApp>
</template>
