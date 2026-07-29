<script setup lang="ts">
import { ACTIVITY_THEME_OPTIONS } from '~/config/stats-themes'
import { ALIGNMENT_OPTIONS } from '~/config/ui-options'
import type { BlockOf } from '~/types'

const props = defineProps<{ block: BlockOf<'activity'> }>()
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
      label="GitHub username"
      size="sm"
      hint="required"
    >
      <UInput
        v-model="model.username"
        placeholder="octocat"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Theme"
      size="sm"
      :hint="`${ACTIVITY_THEME_OPTIONS.length} available`"
    >
      <USelectMenu
        v-model="model.theme"
        :items="ACTIVITY_THEME_OPTIONS"
        value-key="value"
        class="w-full"
      />
    </UFormField>

    <div class="grid grid-cols-2 gap-2">
      <UFormField
        :label="`History: ${model.days} days`"
        size="sm"
      >
        <USlider
          v-model="model.days"
          :min="7"
          :max="90"
        />
      </UFormField>

      <UFormField
        :label="`Height: ${model.height}px`"
        size="sm"
      >
        <USlider
          v-model="model.height"
          :min="200"
          :max="500"
          :step="10"
        />
      </UFormField>
    </div>

    <UFormField
      :label="`Corner radius: ${model.radius}px`"
      size="sm"
    >
      <USlider
        v-model="model.radius"
        :min="0"
        :max="30"
      />
    </UFormField>

    <ToggleRow
      v-model="model.area"
      label="Fill under the line"
      hint="Area chart instead of a plain line"
    />
    <ToggleRow
      v-model="model.hideBorder"
      label="Hide the border"
    />
    <ToggleRow
      v-model="model.hideTitle"
      label="Hide the title"
    />

    <UFormField
      v-if="!model.hideTitle"
      label="Custom title"
      size="sm"
      hint="optional"
    >
      <UInput
        v-model="model.customTitle"
        placeholder="Contribution graph"
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
      />
    </UFormField>

    <p
      v-if="!model.username.trim()"
      class="text-xs text-warning"
    >
      Add a username — this section is left out of the README until you do.
    </p>
  </div>
</template>
