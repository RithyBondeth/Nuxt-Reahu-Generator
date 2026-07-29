<script setup lang="ts">
import { STATS_THEME_OPTIONS } from '~/config/stats-themes'
import { QUOTE_LAYOUT_OPTIONS } from '~/config/widgets'
import { ALIGNMENT_OPTIONS } from '~/config/ui-options'
import type { BlockOf } from '~/types'

const props = defineProps<{ block: BlockOf<'quote'> }>()
const model = computed(() => props.block.props)
</script>

<template>
  <div class="space-y-3">
    <UFormField
      label="Layout"
      size="sm"
    >
      <SegmentedField
        v-model="model.layout"
        :items="QUOTE_LAYOUT_OPTIONS"
      />
    </UFormField>

    <UFormField
      label="Theme"
      size="sm"
    >
      <USelectMenu
        v-model="model.theme"
        :items="STATS_THEME_OPTIONS"
        value-key="value"
        class="w-full"
      />
    </UFormField>

    <ToggleRow
      v-model="model.border"
      label="Draw a border"
    />
    <ToggleRow
      v-model="model.animate"
      label="Animate the quote in"
    />

    <UFormField
      label="Align"
      size="sm"
    >
      <SegmentedField
        v-model="model.align"
        :items="ALIGNMENT_OPTIONS"
      />
    </UFormField>

    <p class="text-xs text-dimmed">
      A different quote is picked each time the image loads, so this block has
      nothing to fill in — and no way to preview the one a visitor will see.
    </p>
  </div>
</template>
