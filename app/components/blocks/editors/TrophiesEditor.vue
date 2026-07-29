<script setup lang="ts">
import { TROPHY_THEME_OPTIONS } from '~/config/stats-themes'
import { TROPHY_TITLES } from '~/config/widgets'
import { ALIGNMENT_OPTIONS } from '~/config/ui-options'
import type { BlockOf, TrophyTitle } from '~/types'

const props = defineProps<{ block: BlockOf<'trophies'> }>()
const model = computed(() => props.block.props)

const selected = computed(() => new Set(model.value.titles))

function toggle(title: TrophyTitle) {
  const index = model.value.titles.indexOf(title)
  if (index === -1) model.value.titles.push(title)
  else model.value.titles.splice(index, 1)
}
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
    >
      <USelectMenu
        v-model="model.theme"
        :items="TROPHY_THEME_OPTIONS"
        value-key="value"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Categories"
      size="sm"
      :hint="model.titles.length ? `${model.titles.length} chosen` : 'all'"
    >
      <div class="flex flex-wrap gap-1">
        <button
          v-for="title in TROPHY_TITLES"
          :key="title.value"
          type="button"
          class="chip"
          :class="{ 'is-active': selected.has(title.value) }"
          :aria-pressed="selected.has(title.value)"
          @click="toggle(title.value)"
        >
          {{ title.label }}
        </button>
      </div>
    </UFormField>

    <div class="grid grid-cols-2 gap-2">
      <UFormField
        :label="`Columns: ${model.column}`"
        size="sm"
      >
        <USlider
          v-model="model.column"
          :min="1"
          :max="8"
        />
      </UFormField>

      <UFormField
        :label="`Rows: ${model.row}`"
        size="sm"
      >
        <USlider
          v-model="model.row"
          :min="1"
          :max="4"
        />
      </UFormField>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <UFormField
        :label="`Gap across: ${model.marginW}`"
        size="sm"
      >
        <USlider
          v-model="model.marginW"
          :min="0"
          :max="30"
        />
      </UFormField>

      <UFormField
        :label="`Gap down: ${model.marginH}`"
        size="sm"
      >
        <USlider
          v-model="model.marginH"
          :min="0"
          :max="30"
        />
      </UFormField>
    </div>

    <ToggleRow
      v-model="model.noFrame"
      label="Hide tile frames"
    />
    <ToggleRow
      v-model="model.noBackground"
      label="Transparent background"
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

    <p
      v-if="!model.username.trim()"
      class="text-xs text-warning"
    >
      Add a username — this section is left out of the README until you do.
    </p>

    <p class="text-xs text-dimmed">
      The project's own host is currently returning errors, so this points at a
      working deployment of the same service. If the card goes blank, check
      <code>TROPHY_HOST</code> in <code>config/services.ts</code>.
    </p>
  </div>
</template>
