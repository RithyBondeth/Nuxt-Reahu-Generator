<script setup lang="ts">
import { BANNER_ANIMATIONS, BANNER_SHAPES, COLOR_MODE_OPTIONS } from '~/config/widgets'
import type { BlockOf } from '~/types'

const props = defineProps<{ block: BlockOf<'banner'> }>()
const model = computed(() => props.block.props)

const SECTIONS = [
  { label: 'Top of page', value: 'header' as const, icon: 'i-lucide-panel-top' },
  { label: 'Bottom', value: 'footer' as const, icon: 'i-lucide-panel-bottom' }
]

const shapeHint = computed(() =>
  BANNER_SHAPES.find(shape => shape.value === model.value.shape)?.hint
)
</script>

<template>
  <div class="space-y-3">
    <UFormField
      label="Shape"
      size="sm"
      :hint="shapeHint"
    >
      <USelect
        v-model="model.shape"
        :items="BANNER_SHAPES"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Title"
      size="sm"
      hint="optional"
    >
      <UInput
        v-model="model.text"
        placeholder="Your Name"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Subtitle"
      size="sm"
      hint="optional"
    >
      <UInput
        v-model="model.subtext"
        placeholder="Full-stack developer"
        class="w-full"
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

    <UFormField
      :label="`Height: ${model.height}px`"
      size="sm"
    >
      <USlider
        v-model="model.height"
        :min="60"
        :max="400"
        :step="10"
      />
    </UFormField>

    <template v-if="model.text.trim()">
      <div class="grid grid-cols-2 gap-2">
        <UFormField
          :label="`Text size: ${model.fontSize}`"
          size="sm"
        >
          <USlider
            v-model="model.fontSize"
            :min="16"
            :max="90"
          />
        </UFormField>

        <ColorField
          v-model="model.fontColor"
          label="Text colour"
        />
      </div>

      <div class="grid grid-cols-2 gap-2">
        <UFormField
          :label="`Across: ${model.fontAlign}%`"
          size="sm"
        >
          <USlider
            v-model="model.fontAlign"
            :min="0"
            :max="100"
          />
        </UFormField>

        <UFormField
          :label="`Down: ${model.fontAlignY}%`"
          size="sm"
        >
          <USlider
            v-model="model.fontAlignY"
            :min="0"
            :max="100"
          />
        </UFormField>
      </div>

      <UFormField
        label="Text entrance"
        size="sm"
      >
        <USelect
          v-model="model.animation"
          :items="BANNER_ANIMATIONS"
          class="w-full"
        />
      </UFormField>
    </template>

    <UFormField
      label="Position"
      size="sm"
    >
      <SegmentedField
        v-model="model.section"
        :items="SECTIONS"
      />
    </UFormField>

    <ToggleRow
      v-model="model.reversal"
      label="Flip the shape"
      hint="Mirrors the curve vertically"
    />
  </div>
</template>
