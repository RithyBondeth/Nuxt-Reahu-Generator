<script setup lang="ts">
import { TYPING_FONTS } from '~/config/widgets'
import { ALIGNMENT_OPTIONS } from '~/config/ui-options'
import type { BlockOf } from '~/types'

const props = defineProps<{ block: BlockOf<'typing'> }>()
const model = computed(() => props.block.props)

const WEIGHTS = [
  { label: 'Regular', value: 400 },
  { label: 'Medium', value: 500 },
  { label: 'Semibold', value: 600 },
  { label: 'Bold', value: 700 }
]
</script>

<template>
  <div class="space-y-3">
    <UFormField
      label="Lines"
      size="sm"
      hint="typed in order, then looped"
    >
      <StringListField
        v-model="model.lines"
        placeholder="Full-stack developer"
        add-label="Add line"
        :max="12"
      />
    </UFormField>

    <div class="grid grid-cols-2 gap-2">
      <UFormField
        label="Font"
        size="sm"
      >
        <USelect
          v-model="model.font"
          :items="TYPING_FONTS"
          class="w-full"
        />
      </UFormField>

      <UFormField
        label="Weight"
        size="sm"
      >
        <USelect
          v-model="model.weight"
          :items="WEIGHTS"
          class="w-full"
        />
      </UFormField>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <UFormField
        :label="`Size: ${model.size}px`"
        size="sm"
      >
        <USlider
          v-model="model.size"
          :min="12"
          :max="60"
        />
      </UFormField>

      <ColorField
        v-model="model.color"
        label="Colour"
      />
    </div>

    <div class="grid grid-cols-2 gap-2">
      <UFormField
        :label="`Line time: ${(model.duration / 1000).toFixed(1)}s`"
        size="sm"
      >
        <USlider
          v-model="model.duration"
          :min="1000"
          :max="8000"
          :step="250"
        />
      </UFormField>

      <UFormField
        :label="`Pause: ${(model.pause / 1000).toFixed(1)}s`"
        size="sm"
      >
        <USlider
          v-model="model.pause"
          :min="0"
          :max="3000"
          :step="100"
        />
      </UFormField>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <UFormField
        label="Width"
        size="sm"
      >
        <UInput
          v-model.number="model.width"
          type="number"
          :min="100"
          :max="1000"
          class="w-full"
        />
      </UFormField>

      <UFormField
        label="Height"
        size="sm"
      >
        <UInput
          v-model.number="model.height"
          type="number"
          :min="30"
          :max="400"
          class="w-full"
        />
      </UFormField>
    </div>

    <ToggleRow
      v-model="model.multiline"
      label="Keep lines on screen"
      hint="Stacks them instead of clearing between"
    />
    <ToggleRow
      v-model="model.repeat"
      label="Loop forever"
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
      The SVG animates on GitHub, where most animation is stripped. If a line
      contains a semicolon it becomes a comma — the service reads
      <code>;</code> as the separator between lines.
    </p>
  </div>
</template>
