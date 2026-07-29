<script setup lang="ts">
import { ALIGNMENT_OPTIONS, ICON_THEME_OPTIONS } from '~/config/ui-options'
import type { BlockOf } from '~/types'

const props = defineProps<{ block: BlockOf<'techStack'> }>()
const model = computed(() => props.block.props)
</script>

<template>
  <div class="space-y-3">
    <UFormField
      label="Heading"
      size="sm"
    >
      <UInput
        v-model="model.heading"
        class="w-full"
      />
    </UFormField>

    <div class="grid grid-cols-3 gap-2">
      <UFormField
        label="Theme"
        size="sm"
      >
        <USelect
          v-model="model.theme"
          :items="ICON_THEME_OPTIONS"
          class="w-full"
        />
      </UFormField>

      <UFormField
        label="Per line"
        size="sm"
      >
        <UInput
          v-model.number="model.perLine"
          type="number"
          :min="1"
          :max="15"
          class="w-full"
        />
      </UFormField>

      <UFormField
        label="Align"
        size="sm"
      >
        <USelect
          v-model="model.align"
          :items="ALIGNMENT_OPTIONS"
          class="w-full"
        />
      </UFormField>
    </div>

    <UFormField
      :label="`Icons (${model.icons.length} selected)`"
      size="sm"
    >
      <TechIconPicker
        v-model="model.icons"
        :theme="model.theme"
      />
    </UFormField>
  </div>
</template>
