<script setup lang="ts">
import { STATS_THEME_OPTIONS } from '~/config/stats-themes'
import { ALIGNMENT_OPTIONS } from '~/config/ui-options'
import type { BlockOf } from '~/types'

const props = defineProps<{ block: BlockOf<'repos'> }>()
const model = computed(() => props.block.props)

const PER_ROW = [
  { label: '1 per row', value: 1 },
  { label: '2 per row', value: 2 }
]
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
      label="Repositories"
      size="sm"
      hint="name, or owner/name"
    >
      <StringListField
        v-model="model.repos"
        placeholder="my-project"
        add-label="Add repo"
        mono
        :max="12"
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

    <div class="grid grid-cols-2 gap-2">
      <UFormField
        label="Layout"
        size="sm"
      >
        <SegmentedField
          v-model="model.perRow"
          :items="PER_ROW"
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
      :label="`Corner radius: ${model.borderRadius}px`"
      size="sm"
    >
      <USlider
        v-model="model.borderRadius"
        :min="0"
        :max="24"
      />
    </UFormField>

    <ToggleRow
      v-model="model.showOwner"
      label="Show the owner name"
    />
    <ToggleRow
      v-model="model.hideBorder"
      label="Hide the card border"
    />

    <p
      v-if="!model.username.trim() || !model.repos.some(repo => repo.trim())"
      class="text-xs text-warning"
    >
      Add a username and at least one repository — this section is left out
      until you do.
    </p>
  </div>
</template>
