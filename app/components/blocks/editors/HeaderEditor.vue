<script setup lang="ts">
import { ALIGNMENT_OPTIONS, BADGE_STYLE_OPTIONS } from '~/config/ui-options'
import type { BlockOf } from '~/types'

const props = defineProps<{ block: BlockOf<'header'> }>()

/**
 * Editors write through a computed rather than touching `props` directly. The
 * object is shared store state owned by `useReadme`, so mutating it is correct —
 * this indirection just keeps that intent explicit (and `vue/no-mutating-props`
 * honest about what it is looking at).
 */
const model = computed(() => props.block.props)

const COUNTERS = [
  { key: 'showVisitorBadge', label: 'Profile views', hint: 'Counted by komarev.com' },
  { key: 'showFollowers', label: 'Follower count', hint: 'Live from the GitHub API' },
  { key: 'showStars', label: 'Total stars', hint: 'Across repos you own' }
] as const

const anyCounter = computed(() =>
  model.value.showVisitorBadge || model.value.showFollowers || model.value.showStars
)
</script>

<template>
  <div class="space-y-3">
    <UFormField
      label="Name"
      size="sm"
    >
      <UInput
        v-model="model.name"
        placeholder="Your Name"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Tagline"
      size="sm"
    >
      <UInput
        v-model="model.tagline"
        placeholder="Full-stack developer"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Banner image URL"
      size="sm"
      hint="optional"
    >
      <UInput
        v-model="model.bannerUrl"
        placeholder="https://…"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Alignment"
      size="sm"
    >
      <SegmentedField
        v-model="model.align"
        :items="ALIGNMENT_OPTIONS"
      />
    </UFormField>

    <div class="space-y-1 pt-1">
      <p class="eyebrow text-dimmed">
        Counters
      </p>
      <ToggleRow
        v-for="counter in COUNTERS"
        :key="counter.key"
        v-model="model[counter.key]"
        :label="counter.label"
        :hint="counter.hint"
      />
    </div>

    <template v-if="anyCounter">
      <UFormField
        label="GitHub username"
        size="sm"
        hint="required for counters"
      >
        <UInput
          v-model="model.username"
          placeholder="octocat"
          class="w-full"
        />
      </UFormField>

      <div class="grid grid-cols-2 gap-2">
        <UFormField
          label="Badge style"
          size="sm"
        >
          <USelect
            v-model="model.badgeStyle"
            :items="BADGE_STYLE_OPTIONS"
            class="w-full"
          />
        </UFormField>

        <ColorField
          v-model="model.badgeColor"
          label="Badge colour"
        />
      </div>

      <p
        v-if="!model.username.trim()"
        class="text-xs text-warning"
      >
        Add a username — the counters are left out until you do.
      </p>
    </template>
  </div>
</template>
