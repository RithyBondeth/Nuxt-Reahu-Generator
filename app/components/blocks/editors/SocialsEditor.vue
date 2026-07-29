<script setup lang="ts">
import { PLATFORM_OPTIONS } from '~/config/social-platforms'
import { ALIGNMENT_OPTIONS, BADGE_STYLE_OPTIONS } from '~/config/ui-options'
import type { BlockOf } from '~/types'

const props = defineProps<{ block: BlockOf<'socials'> }>()
const model = computed(() => props.block.props)

const hasAnyLink = computed(() => model.value.links.some(link => link.value.trim()))

const addLink = () => model.value.links.push({ platform: 'github', value: '' })
const removeLink = (index: number) => model.value.links.splice(index, 1)
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

    <div class="grid grid-cols-2 gap-2">
      <UFormField
        label="Badge style"
        size="sm"
      >
        <USelect
          v-model="model.style"
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

    <ToggleRow
      v-model="model.showLabels"
      label="Show platform names"
      hint="Off gives you logo-only badges"
    />

    <UFormField
      :label="`Links (${PLATFORM_OPTIONS.length} platforms)`"
      size="sm"
    >
      <div class="space-y-2">
        <TransitionGroup name="row">
          <SocialLinkRow
            v-for="(link, index) in model.links"
            :key="index"
            v-model="model.links[index]!"
            @remove="removeLink(index)"
          />
        </TransitionGroup>

        <UButton
          icon="i-lucide-plus"
          label="Add link"
          color="neutral"
          variant="soft"
          size="xs"
          @click="addLink"
        />

        <p
          v-if="!hasAnyLink"
          class="text-xs text-warning"
        >
          Fill in at least one link — empty sections are left out of the README.
        </p>
      </div>
    </UFormField>
  </div>
</template>
