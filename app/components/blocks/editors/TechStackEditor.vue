<script setup lang="ts">
import {
  ALIGNMENT_OPTIONS,
  BADGE_STYLE_OPTIONS,
  ICON_PROVIDER_OPTIONS,
  ICON_THEME_OPTIONS
} from '~/config/ui-options'
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

    <UFormField
      label="Render as"
      size="sm"
    >
      <SegmentedField
        v-model="model.provider"
        :items="ICON_PROVIDER_OPTIONS"
      />
    </UFormField>

    <div class="grid grid-cols-3 gap-2">
      <UFormField
        v-if="model.provider === 'skillicons'"
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
        v-if="model.provider === 'skillicons'"
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
        v-if="model.provider === 'badges'"
        label="Badge style"
        size="sm"
        class="col-span-2"
      >
        <USelect
          v-model="model.badgeStyle"
          :items="BADGE_STYLE_OPTIONS"
          class="w-full"
        />
      </UFormField>

      <UFormField
        label="Align"
        size="sm"
      >
        <SegmentedField
          v-model="model.align"
          :items="ALIGNMENT_OPTIONS"
          icon-only
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

    <p
      v-if="model.provider === 'badges'"
      class="text-xs text-dimmed"
    >
      A few marks — Java, VS Code, AWS, Azure, C#, the Adobe apps — have been
      withdrawn from simple-icons over trademark claims, so those render as
      text-only badges. The icon grid still draws all of them.
    </p>
  </div>
</template>
