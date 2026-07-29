<script setup lang="ts">
const title = 'Reahu Generator'
const description = 'Compose a GitHub profile README from drag-and-drop blocks. Live preview, shareable links, download the Markdown. No account, no server.'

useHead({
  titleTemplate: chunk => (chunk ? `${chunk} · ${title}` : title),
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#111111' }
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/reahu-mark.svg' },
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
  ogImage: '/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Reahu Generator',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: '/og-image.png'
})
</script>

<template>
  <UApp>
    <header class="site-header sticky top-0 z-50">
      <UContainer class="flex h-16 max-w-[90rem] items-center gap-4">
        <NuxtLink
          to="/"
          class="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <BrandMark />
        </NuxtLink>

        <nav
          class="site-nav absolute left-1/2 hidden -translate-x-1/2 items-center p-1 md:flex"
          aria-label="Primary navigation"
        >
          <NuxtLink
            to="/"
            class="site-nav__link"
          >
            Overview
          </NuxtLink>
          <NuxtLink
            to="/#blocks"
            class="site-nav__link"
          >
            Blocks
          </NuxtLink>
          <NuxtLink
            to="/build"
            class="site-nav__link"
          >
            Builder
          </NuxtLink>
        </nav>

        <div class="ms-auto flex items-center gap-1.5">
          <UColorModeButton
            color="neutral"
            variant="ghost"
          />
          <UButton
            to="https://github.com/RithyBondeth/Nuxt-Reahu-Generator"
            target="_blank"
            icon="i-simple-icons-github"
            aria-label="Reahu on GitHub"
            color="neutral"
            variant="ghost"
            class="hidden sm:inline-flex"
          />
          <UButton
            to="/build"
            label="Build yours"
            trailing-icon="i-lucide-arrow-up-right"
            size="sm"
            class="ms-1"
          />
        </div>
      </UContainer>
    </header>

    <UMain>
      <NuxtPage />
    </UMain>

    <footer class="border-t border-default">
      <UContainer class="flex max-w-[90rem] flex-col gap-4 py-8 text-sm text-muted sm:flex-row sm:items-center">
        <BrandMark :wordmark="false" />
        <p>Markdown in. Markdown out. Nothing leaves your browser.</p>
        <div class="sm:ms-auto">
          © {{ new Date().getFullYear() }} Reahu
        </div>
      </UContainer>
    </footer>
  </UApp>
</template>
