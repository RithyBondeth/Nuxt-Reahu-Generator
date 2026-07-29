<script setup lang="ts">
import type { Component } from 'vue'
import type { Block, BlockType } from '~/types'
import AboutEditor from './editors/AboutEditor.vue'
import ActivityEditor from './editors/ActivityEditor.vue'
import BadgesEditor from './editors/BadgesEditor.vue'
import BannerEditor from './editors/BannerEditor.vue'
import DividerEditor from './editors/DividerEditor.vue'
import HeaderEditor from './editors/HeaderEditor.vue'
import MarkdownEditor from './editors/MarkdownEditor.vue'
import QuoteEditor from './editors/QuoteEditor.vue'
import ReposEditor from './editors/ReposEditor.vue'
import SnakeEditor from './editors/SnakeEditor.vue'
import SocialsEditor from './editors/SocialsEditor.vue'
import StatsEditor from './editors/StatsEditor.vue'
import SupportEditor from './editors/SupportEditor.vue'
import TableEditor from './editors/TableEditor.vue'
import TechStackEditor from './editors/TechStackEditor.vue'
import TrophiesEditor from './editors/TrophiesEditor.vue'
import TypingEditor from './editors/TypingEditor.vue'

const props = defineProps<{ block: Block }>()

/**
 * Explicit map rather than resolving a component name at runtime, so a missing
 * editor is a type error at build time instead of a blank card in the UI.
 */
const EDITORS: Record<BlockType, Component> = {
  header: HeaderEditor,
  banner: BannerEditor,
  typing: TypingEditor,
  about: AboutEditor,
  techStack: TechStackEditor,
  stats: StatsEditor,
  activity: ActivityEditor,
  trophies: TrophiesEditor,
  repos: ReposEditor,
  snake: SnakeEditor,
  badges: BadgesEditor,
  socials: SocialsEditor,
  support: SupportEditor,
  quote: QuoteEditor,
  table: TableEditor,
  divider: DividerEditor,
  markdown: MarkdownEditor
}

const editor = computed(() => EDITORS[props.block.type])
</script>

<template>
  <component
    :is="editor"
    :block="block as never"
  />
</template>
