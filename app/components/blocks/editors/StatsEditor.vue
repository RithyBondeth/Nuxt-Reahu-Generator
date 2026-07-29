<script setup lang="ts">
import { STATS_THEME_OPTIONS } from '~/config/stats-themes'
import type { BlockOf } from '~/types'

const props = defineProps<{ block: BlockOf<'stats'> }>()
const model = computed(() => props.block.props)

const TOGGLES = [
  { key: 'showStats', label: 'Stats card' },
  { key: 'showTopLangs', label: 'Top languages' },
  { key: 'showStreak', label: 'Streak' },
  { key: 'sideBySide', label: 'Side by side' }
] as const
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
      <USelect
        v-model="model.theme"
        :items="STATS_THEME_OPTIONS"
        class="w-full"
      />
    </UFormField>

    <div class="space-y-2 pt-1">
      <div
        v-for="toggle in TOGGLES"
        :key="toggle.key"
        class="flex items-center justify-between gap-3"
      >
        <span class="text-sm text-muted">{{ toggle.label }}</span>
        <USwitch v-model="model[toggle.key]" />
      </div>
    </div>

    <p
      v-if="!model.username.trim()"
      class="text-xs text-warning"
    >
      Add a username — this section is left out of the README until you do.
    </p>

    <p class="text-xs text-dimmed">
      Cards are served by the public
      <a
        href="https://github.com/anuraghazra/github-readme-stats#deploy-on-your-own"
        target="_blank"
        class="underline"
      >github-readme-stats</a>
      instance, which is shared and often rate-limited. Self-host it and change
      <code>STATS_HOST</code> in <code>config/services.ts</code> if you see blank cards.
    </p>
  </div>
</template>
