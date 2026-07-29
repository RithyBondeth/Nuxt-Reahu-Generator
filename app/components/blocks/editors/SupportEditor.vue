<script setup lang="ts">
import { SUPPORT_OPTIONS, SUPPORT_PLATFORMS } from '~/config/support-platforms'
import { ALIGNMENT_OPTIONS, BADGE_STYLE_OPTIONS } from '~/config/ui-options'
import type { BlockOf } from '~/types'

const props = defineProps<{ block: BlockOf<'support'> }>()
const model = computed(() => props.block.props)

const add = () => model.value.links.push({ platform: 'kofi', value: '' })
const remove = (index: number) => model.value.links.splice(index, 1)

const hasAnyLink = computed(() => model.value.links.some(link => link.value.trim()))
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
      label="Blurb"
      size="sm"
      hint="optional"
    >
      <UTextarea
        v-model="model.text"
        :rows="2"
        autoresize
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Buttons"
      size="sm"
    >
      <div class="space-y-2">
        <TransitionGroup name="row">
          <div
            v-for="(link, index) in model.links"
            :key="index"
            class="flex items-center gap-1.5"
          >
            <USelectMenu
              v-model="link.platform"
              :items="SUPPORT_OPTIONS"
              value-key="value"
              :icon="`i-simple-icons-${SUPPORT_PLATFORMS[link.platform].logo}`"
              size="sm"
              class="w-40 shrink-0"
            />

            <UInput
              v-model="link.value"
              :placeholder="SUPPORT_PLATFORMS[link.platform].placeholder"
              size="sm"
              class="flex-1"
            />

            <UButton
              icon="i-lucide-x"
              color="neutral"
              variant="ghost"
              size="xs"
              aria-label="Remove button"
              @click="remove(index)"
            />
          </div>
        </TransitionGroup>

        <UButton
          icon="i-lucide-plus"
          label="Add button"
          color="neutral"
          variant="soft"
          size="xs"
          @click="add"
        />
      </div>
    </UFormField>

    <div class="grid grid-cols-2 gap-2">
      <UFormField
        label="Style"
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

    <p
      v-if="!hasAnyLink"
      class="text-xs text-warning"
    >
      Fill in at least one handle — empty sections are left out of the README.
    </p>
  </div>
</template>
