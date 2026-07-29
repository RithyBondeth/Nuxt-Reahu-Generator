<script setup lang="ts">
import { STATS_THEME_OPTIONS } from '~/config/stats-themes'
import { LANG_LAYOUT_OPTIONS } from '~/config/ui-options'
import type { BlockOf } from '~/types'

const props = defineProps<{ block: BlockOf<'stats'> }>()
const model = computed(() => props.block.props)

const CARDS = [
  { key: 'showStats', label: 'Stats card', hint: 'Commits, PRs, issues, rank' },
  { key: 'showTopLangs', label: 'Top languages', hint: 'By bytes across your repos' },
  { key: 'showStreak', label: 'Contribution streak', hint: 'Current and longest run' }
] as const

const LAYOUT = [
  { key: 'sideBySide', label: 'Side by side', hint: 'One row instead of stacked' },
  { key: 'hideBorder', label: 'Hide card border' },
  { key: 'showIcons', label: 'Show icons' },
  { key: 'hideRank', label: 'Hide the rank circle' },
  { key: 'includeAllCommits', label: 'Count all-time commits', hint: 'Rather than this year only' }
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
      :hint="`${STATS_THEME_OPTIONS.length} available`"
    >
      <USelectMenu
        v-model="model.theme"
        :items="STATS_THEME_OPTIONS"
        value-key="value"
        class="w-full"
        placeholder="Pick a theme"
      />
    </UFormField>

    <div class="space-y-1 pt-1">
      <p class="eyebrow text-dimmed">
        Cards
      </p>
      <ToggleRow
        v-for="card in CARDS"
        :key="card.key"
        v-model="model[card.key]"
        :label="card.label"
        :hint="card.hint"
      />
    </div>

    <template v-if="model.showTopLangs">
      <UFormField
        label="Language chart"
        size="sm"
      >
        <SegmentedField
          v-model="model.langLayout"
          :items="LANG_LAYOUT_OPTIONS"
          icon-only
        />
      </UFormField>

      <UFormField
        :label="`Languages shown: ${model.langsCount}`"
        size="sm"
      >
        <USlider
          v-model="model.langsCount"
          :min="1"
          :max="20"
        />
      </UFormField>
    </template>

    <div class="space-y-1 pt-1">
      <p class="eyebrow text-dimmed">
        Layout
      </p>
      <ToggleRow
        v-for="option in LAYOUT"
        :key="option.key"
        v-model="model[option.key]"
        :label="option.label"
        :hint="'hint' in option ? option.hint : undefined"
      />
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

    <p
      v-if="!model.username.trim()"
      class="text-xs text-warning"
    >
      Add a username — this section is left out of the README until you do.
    </p>

    <p class="text-xs text-dimmed">
      These cards come from a community deployment of
      <a
        href="https://github.com/anuraghazra/github-readme-stats#deploy-on-your-own"
        target="_blank"
        class="underline"
      >github-readme-stats</a>, because the project's own instance is currently
      paused. Anyone who opens your profile fetches an image from that host. If
      you rely on these cards, deploy your own copy and set
      <code>STATS_HOST</code> in <code>config/services.ts</code>.
    </p>
  </div>
</template>
