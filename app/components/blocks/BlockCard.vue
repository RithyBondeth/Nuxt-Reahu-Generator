<script setup lang="ts">
import { BLOCK_DEFINITIONS } from '~/core/blocks'
import type { Block } from '~/types'

const props = defineProps<{ block: Block, index: number, total: number }>()

const { remove, duplicate, move } = useReadme()

const open = ref(true)
const definition = computed(() => BLOCK_DEFINITIONS[props.block.type])
</script>

<template>
  <div class="overflow-hidden rounded-lg border border-default bg-elevated/40">
    <header class="flex items-center gap-2 px-2 py-2">
      <UIcon
        name="i-lucide-grip-vertical"
        class="drag-handle size-5 shrink-0 cursor-grab text-dimmed active:cursor-grabbing"
      />

      <button
        class="flex min-w-0 flex-1 items-center gap-2 text-left"
        @click="open = !open"
      >
        <UIcon
          :name="definition.icon"
          class="size-4 shrink-0 text-primary"
        />
        <span class="truncate text-sm font-medium">{{ definition.label }}</span>
        <UIcon
          name="i-lucide-chevron-down"
          class="size-4 shrink-0 text-dimmed transition-transform"
          :class="{ '-rotate-90': !open }"
        />
      </button>

      <div class="flex shrink-0 items-center">
        <UButton
          icon="i-lucide-chevron-up"
          color="neutral"
          variant="ghost"
          size="xs"
          :disabled="index === 0"
          aria-label="Move up"
          @click="move(block.id, -1)"
        />
        <UButton
          icon="i-lucide-chevron-down"
          color="neutral"
          variant="ghost"
          size="xs"
          :disabled="index === total - 1"
          aria-label="Move down"
          @click="move(block.id, 1)"
        />
        <UButton
          icon="i-lucide-copy"
          color="neutral"
          variant="ghost"
          size="xs"
          aria-label="Duplicate"
          @click="duplicate(block.id)"
        />
        <UButton
          icon="i-lucide-trash-2"
          color="error"
          variant="ghost"
          size="xs"
          aria-label="Delete"
          @click="remove(block.id)"
        />
      </div>
    </header>

    <div
      v-if="open"
      class="border-t border-default px-3 py-3"
    >
      <BlockEditor :block="block" />
    </div>
  </div>
</template>
