<script setup lang="ts">
import type { Block } from '~/types'
import AboutEditor from './editors/AboutEditor.vue'
import HeaderEditor from './editors/HeaderEditor.vue'
import MarkdownEditor from './editors/MarkdownEditor.vue'
import SocialsEditor from './editors/SocialsEditor.vue'
import StatsEditor from './editors/StatsEditor.vue'
import TechStackEditor from './editors/TechStackEditor.vue'

const props = defineProps<{ block: Block }>()

/**
 * Explicit map rather than resolving a component name at runtime, so a missing
 * editor is a type error at build time instead of a blank card in the UI.
 */
const EDITORS = {
  header: HeaderEditor,
  about: AboutEditor,
  techStack: TechStackEditor,
  stats: StatsEditor,
  socials: SocialsEditor,
  markdown: MarkdownEditor
} as const

const editor = computed(() => EDITORS[props.block.type])
</script>

<template>
  <component
    :is="editor"
    :block="block as never"
  />
</template>
