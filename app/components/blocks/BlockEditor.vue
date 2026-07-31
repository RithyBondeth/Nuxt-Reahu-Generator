<script setup lang="ts">
import { defineAsyncComponent, type Component } from 'vue'
import type { Block, BlockType } from '~/types'

const props = defineProps<{ block: Block }>()

/**
 * Keep each editor in its own chunk. A document can contain many block types,
 * but only an opened card needs its form code.
 */
const EDITORS: Record<BlockType, Component> = {
  header: defineAsyncComponent(() => import('./editors/HeaderEditor.vue')),
  banner: defineAsyncComponent(() => import('./editors/BannerEditor.vue')),
  typing: defineAsyncComponent(() => import('./editors/TypingEditor.vue')),
  about: defineAsyncComponent(() => import('./editors/AboutEditor.vue')),
  techStack: defineAsyncComponent(() => import('./editors/TechStackEditor.vue')),
  stats: defineAsyncComponent(() => import('./editors/StatsEditor.vue')),
  activity: defineAsyncComponent(() => import('./editors/ActivityEditor.vue')),
  trophies: defineAsyncComponent(() => import('./editors/TrophiesEditor.vue')),
  repos: defineAsyncComponent(() => import('./editors/ReposEditor.vue')),
  snake: defineAsyncComponent(() => import('./editors/SnakeEditor.vue')),
  badges: defineAsyncComponent(() => import('./editors/BadgesEditor.vue')),
  socials: defineAsyncComponent(() => import('./editors/SocialsEditor.vue')),
  support: defineAsyncComponent(() => import('./editors/SupportEditor.vue')),
  quote: defineAsyncComponent(() => import('./editors/QuoteEditor.vue')),
  table: defineAsyncComponent(() => import('./editors/TableEditor.vue')),
  divider: defineAsyncComponent(() => import('./editors/DividerEditor.vue')),
  markdown: defineAsyncComponent(() => import('./editors/MarkdownEditor.vue'))
}

const editor = computed(() => EDITORS[props.block.type])
</script>

<template>
  <component
    :is="editor"
    :block="block as never"
  />
</template>
