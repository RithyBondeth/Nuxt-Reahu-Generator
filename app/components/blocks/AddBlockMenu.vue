<script setup lang="ts">
import { BLOCK_DEFINITIONS, BLOCK_ORDER } from '~/core/blocks'

const { add } = useReadme()
const open = ref(false)
</script>

<template>
  <UPopover v-model:open="open">
    <UButton
      icon="i-lucide-plus"
      label="Add block"
      color="neutral"
      variant="subtle"
      block
    />

    <template #content>
      <div class="w-72 p-1.5">
        <button
          v-for="type in BLOCK_ORDER"
          :key="type"
          type="button"
          class="flex w-full items-start gap-2.5 rounded-md p-2 text-left transition hover:bg-elevated"
          @click="add(type); open = false"
        >
          <UIcon
            :name="BLOCK_DEFINITIONS[type].icon"
            class="mt-0.5 size-4 shrink-0 text-primary"
          />
          <span class="min-w-0">
            <span class="block text-sm font-medium">{{ BLOCK_DEFINITIONS[type].label }}</span>
            <span class="block text-xs text-dimmed">{{ BLOCK_DEFINITIONS[type].description }}</span>
          </span>
        </button>
      </div>
    </template>
  </UPopover>
</template>
