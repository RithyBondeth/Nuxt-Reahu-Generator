<script setup lang="ts">
import { ALIGNMENT_OPTIONS } from '~/config/ui-options'
import type { BlockOf } from '~/types'

const props = defineProps<{ block: BlockOf<'header'> }>()

/**
 * Editors write through a computed rather than touching `props` directly. The
 * object is shared store state owned by `useReadme`, so mutating it is correct —
 * this indirection just keeps that intent explicit (and `vue/no-mutating-props`
 * honest about what it is looking at).
 */
const model = computed(() => props.block.props)
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
      <USelect
        v-model="model.align"
        :items="ALIGNMENT_OPTIONS"
        class="w-full"
      />
    </UFormField>

    <div class="flex items-center justify-between gap-3 pt-1">
      <span class="text-sm text-muted">Profile view counter</span>
      <USwitch v-model="model.showVisitorBadge" />
    </div>

    <UFormField
      v-if="model.showVisitorBadge"
      label="GitHub username"
      size="sm"
    >
      <UInput
        v-model="model.username"
        placeholder="octocat"
        class="w-full"
      />
    </UFormField>
  </div>
</template>
