<script setup lang="ts">
import { COLOR_MODE_OPTIONS, DIVIDER_STYLES } from '~/config/widgets'
import type { BlockOf } from '~/types'

const props = defineProps<{ block: BlockOf<'divider'> }>()
const model = computed(() => props.block.props)

/** `rule` and `blank` are plain Markdown — nothing to colour or size. */
const isDrawn = computed(() => model.value.style !== 'rule' && model.value.style !== 'blank')

const hint = computed(() => DIVIDER_STYLES.find(style => style.value === model.value.style)?.hint)
</script>

<template>
  <div class="space-y-3">
    <UFormField
      label="Style"
      size="sm"
      :hint="hint"
    >
      <USelect
        v-model="model.style"
        :items="DIVIDER_STYLES"
        class="w-full"
      />
    </UFormField>

    <template v-if="isDrawn">
      <UFormField
        :label="`Height: ${model.height}px`"
        size="sm"
      >
        <USlider
          v-model="model.height"
          :min="2"
          :max="120"
        />
      </UFormField>

      <UFormField
        label="Colour"
        size="sm"
      >
        <SegmentedField
          v-model="model.colorMode"
          :items="COLOR_MODE_OPTIONS"
        />
      </UFormField>

      <div
        v-if="model.colorMode !== 'auto'"
        class="grid grid-cols-2 gap-2"
      >
        <ColorField
          v-model="model.colorFrom"
          :label="model.colorMode === 'gradient' ? 'From' : 'Fill'"
        />
        <ColorField
          v-if="model.colorMode === 'gradient'"
          v-model="model.colorTo"
          label="To"
        />
      </div>
    </template>
  </div>
</template>
