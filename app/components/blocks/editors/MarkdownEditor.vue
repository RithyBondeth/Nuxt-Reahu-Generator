<script setup lang="ts">
import type { BlockOf } from '~/types'

const props = defineProps<{ block: BlockOf<'markdown'> }>()
const model = computed(() => props.block.props)
</script>

<template>
  <UFormField
    label="Markdown"
    size="sm"
    hint="raw — rendered as-is"
  >
    <UTextarea
      v-model="model.source"
      :rows="8"
      autoresize
      class="w-full font-mono text-xs"
    />
  </UFormField>
</template>
