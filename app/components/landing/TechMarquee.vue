<script setup lang="ts">
import { SERVICES } from '~/config/services'

/**
 * A slow pass through the icon set the tech-stack block can render.
 *
 * skillicons composes any number of slugs into a single sprite, so this is one
 * request rather than one per icon — and it sidesteps lazy loading, which never
 * fires for a marquee: the icons move by transform, so the viewport never
 * scrolls far enough to trigger them and they would stay blank forever.
 *
 * The track holds the sprite twice with no gap, so translating half the track
 * lands exactly one sprite-width along and the loop has no seam.
 */
const STRIP = [
  'ts', 'js', 'python', 'go', 'rust', 'java', 'kotlin', 'swift', 'php', 'cpp',
  'vue', 'nuxtjs', 'react', 'nextjs', 'svelte', 'tailwind', 'vite',
  'nodejs', 'bun', 'deno', 'nestjs', 'django', 'laravel', 'graphql',
  'postgres', 'mongodb', 'redis', 'supabase', 'prisma',
  'docker', 'kubernetes', 'aws', 'vercel', 'linux', 'git', 'figma'
]

const stripUrl = `${SERVICES.skillIcons}?i=${STRIP.join(',')}&perline=${STRIP.length}&theme=dark`
</script>

<template>
  <div class="marquee overflow-hidden">
    <div class="marquee__track">
      <img
        :src="stripUrl"
        alt="Tools you can add to the tech stack block"
        class="h-10 w-auto max-w-none grayscale opacity-55 transition hover:grayscale-0 hover:opacity-90 sm:h-11"
      >
      <img
        :src="stripUrl"
        alt=""
        aria-hidden="true"
        class="h-10 w-auto max-w-none grayscale opacity-55 sm:h-11"
      >
    </div>
  </div>
</template>
