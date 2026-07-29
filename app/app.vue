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
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg?v=3' }
  ],
  htmlAttrs: {
    lang: 'en'
  },
  script: [
    {
      key: 'reahu-appearance',
      tagPosition: 'head',
      innerHTML: `(function(){try{var a=localStorage.getItem('reahu:accent-theme');var f=localStorage.getItem('reahu:font-theme');if(['lime','sky','coral','violet','gold','mint','pink','orange'].includes(a))document.documentElement.dataset.accentTheme=a;if(['modern','editorial','technical','ubuntu','noto'].includes(f))document.documentElement.dataset.fontTheme=f}catch(e){}})()`
    }
  ]
})

useSeoMeta({
  title,
  description,
  ogType: 'website',
  ogSiteName: title,
  ogTitle: title,
  ogDescription: description,
  ogImage: '/og-templates.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Reahu Generator',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: '/og-templates.png'
})
</script>

<template>
  <UApp>
    <header class="site-header sticky top-0 z-50">
      <UContainer class="flex h-14 max-w-[96rem] items-center gap-5">
        <NuxtLink
          to="/"
          class="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <BrandMark />
        </NuxtLink>

        <nav
          class="site-nav hidden items-stretch self-stretch md:flex"
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
            to="/templates"
            class="site-nav__link"
          >
            Templates
          </NuxtLink>
          <NuxtLink
            to="/build"
            class="site-nav__link"
          >
            Builder
          </NuxtLink>
        </nav>

        <div class="ms-auto flex items-center gap-1.5">
          <AppearancePicker />
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
            label="Open builder"
            trailing-icon="i-lucide-arrow-right"
            size="sm"
            class="ms-1 !rounded-sm"
          />
        </div>
      </UContainer>
    </header>

    <UMain>
      <NuxtPage />
    </UMain>

    <footer class="site-footer">
      <UContainer class="max-w-[96rem] py-8">
        <div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <BrandMark />
            <p class="mt-3 max-w-sm text-sm leading-6 text-muted">
              A focused workspace for turning your work into a GitHub profile.
            </p>
          </div>
          <div class="flex items-center gap-5 text-xs text-dimmed">
            <span>Local-first</span>
            <span>Plain Markdown</span>
            <span>© {{ new Date().getFullYear() }}</span>
          </div>
        </div>
      </UContainer>
    </footer>
  </UApp>
</template>
