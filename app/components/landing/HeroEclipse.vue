<script setup lang="ts">
import { SERVICES } from '~/config/services'

/**
 * The showpiece: a real eclipse. A dark body carrying the rendered README, a
 * corona turning slowly behind it, and the logo's own brackets closing in from
 * either side — Reahu swallowing the moon, which is what the mark depicts.
 *
 * The sample is hand-written rather than piped through `ReadmePreview`, on
 * purpose — that component sanitizes through DOMPurify, which re-serializes
 * markup on the client and would risk a hydration mismatch on a prerendered
 * page. It reuses the real `.readme-body` stylesheet, so what is shown here is
 * styled by exactly the same rules as the builder's live preview.
 */
const skillsUrl = `${SERVICES.skillIcons}?i=ts,vue,nuxtjs,go,postgres,docker&theme=dark`

const badges = [
  { label: 'LinkedIn', color: '0A66C2', logo: 'linkedin' },
  { label: 'GitHub', color: '181717', logo: 'github' },
  { label: 'Email', color: 'EA4335', logo: 'gmail' }
].map(b => `${SERVICES.shields}/${b.label}-${b.color}?style=for-the-badge&logo=${b.logo}&logoColor=white`)
</script>

<template>
  <div class="relative">
    <!-- Corona. Sits behind everything and never takes pointer events. -->
    <div
      class="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <div class="aspect-square w-[112%] max-w-2xl">
        <div class="corona-halo size-full rounded-full" />
      </div>
    </div>
    <div
      class="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <div class="aspect-square w-[104%] max-w-2xl">
        <div class="corona-glow size-full rounded-full opacity-70" />
      </div>
    </div>

    <div class="relative flex items-center justify-center gap-4 lg:gap-8">
      <BracketRule
        side="left"
        class="enter-left d-7 hidden h-52 w-auto shrink-0 md:block lg:h-64"
      />

      <!-- The body of the eclipse. Translucent over the corona so the light
           reads as coming from behind it. -->
      <div class="corona enter-bloom d-6 w-full max-w-lg rounded-[2.25rem] bg-slate-950/85 p-6 shadow-[0_40px_120px_-30px_rgb(0_16_56/0.9)] backdrop-blur-xl sm:p-9">
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

          <p
            align="center"
            class="flex flex-wrap justify-center gap-1.5"
          >
            <img
              v-for="badge in badges"
              :key="badge"
              :src="badge"
              alt=""
              height="22"
              class="h-[22px]"
              loading="lazy"
            >
          </p>
        </div>
      </div>

      <BracketRule
        side="right"
        class="enter-right d-7 hidden h-52 w-auto shrink-0 md:block lg:h-64"
      />
    </div>
  </div>
</template>
