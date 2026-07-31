<script setup lang="ts">
import { BLOCK_DEFINITIONS } from '~/core/blocks'
import type { Block } from '~/types'

const props = defineProps<{ block: Block, index: number, total: number }>()

const { remove, duplicate, move } = useReadme()

// Keep a new document scannable: the first block opens as the obvious starting
// point and the rest stay one compact row away.
const open = ref(props.index === 0)
const hasOpened = ref(open.value)
const definition = computed(() => BLOCK_DEFINITIONS[props.block.type])

watch(open, (isOpen) => {
  if (isOpen) hasOpened.value = true
})
</script>

<template>
  <div class="block-card">
    <header class="flex items-center gap-2 px-2.5 py-2.5">
      <UIcon
        name="i-lucide-grip-vertical"
        class="drag-handle size-5 shrink-0 cursor-grab text-dimmed transition-colors hover:text-default active:cursor-grabbing"
      />

      <button
        class="flex min-w-0 flex-1 items-center gap-2 text-left"
        :aria-expanded="open"
        @click="open = !open"
      >
        <span class="block-card__icon">
          <UIcon
            :name="definition.icon"
            class="size-3.5 shrink-0"
          />
        </span>
        <span class="truncate text-sm font-medium">{{ definition.label }}</span>
        <UIcon
          name="i-lucide-chevron-down"
          class="size-4 shrink-0 text-dimmed transition-transform duration-300"
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

    <!--
      `grid-template-rows: 0fr -> 1fr` is what makes this animate to the content's
      own height. A max-height guess would either clip a tall editor or coast
      through empty space on a short one, and neither reads as the panel opening.
    -->
    <div
      class="disclosure"
      :class="{ 'is-open': open }"
    >
      <div class="disclosure__inner">
        <div class="border-t border-default bg-default/35 px-3 py-4">
          <BlockEditor
            v-if="hasOpened"
            :block="block"
          />
        </div>
      </div>
    </div>
  </div>
</template>
