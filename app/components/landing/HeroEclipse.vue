<script setup lang="ts">
import { SERVICES } from '~/config/services'

/**
 * The hero artifact: a rendered README sitting on the eclipse disc, flanked by
 * the logo's own brackets.
 *
 * The sample is hand-written rather than piped through `ReadmePreview`, on
 * purpose — that component sanitizes through DOMPurify, which re-serializes
 * markup on the client and would risk a hydration mismatch on a prerendered
 * page. It reuses the real `.readme-body` stylesheet, so what is shown here is
 * styled by exactly the same rules as the builder's live preview.
 */
const skillsUrl = `${SERVICES.skillIcons}?i=ts,vue,nuxtjs,go,postgres,docker&theme=dark`
</script>

<template>
  <div class="flex items-center justify-center gap-5 lg:gap-9">
    <!-- Sized by height so the brackets stay in proportion with the disc,
         the way they do in the logo. -->
    <BracketRule
      side="left"
      class="hidden h-44 w-auto shrink-0 md:block lg:h-56"
    />

    <div class="corona w-full max-w-lg rounded-[2rem] bg-slate-950 p-6 shadow-2xl shadow-slate-950/25 sm:p-8">
      <div class="readme-body readme-dark readme-inset text-[13px]">
        <div align="center">
          <h1>Rithy Bondeth</h1>
          <h3>Full-stack developer · Phnom Penh</h3>
        </div>

        <h2>About Me</h2>
        <ul>
          <li>🔭 Building developer tools</li>
          <li>💬 Ask me about Nuxt and TypeScript</li>
        </ul>

        <h2>Tech Stack</h2>
        <p align="center">
          <img
            :src="skillsUrl"
            alt="TypeScript, Vue, Nuxt, Go, Postgres, Docker"
            width="300"
            loading="eager"
          >
        </p>
      </div>
    </div>

    <BracketRule
      side="right"
      class="hidden h-44 w-auto shrink-0 md:block lg:h-56"
    />
  </div>
</template>
