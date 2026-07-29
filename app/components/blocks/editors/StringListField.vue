<script setup lang="ts">
/**
 * A reorderable list of single-line strings.
 *
 * Shared by every block whose content is "some lines in an order" — about
 * bullets, typing lines, pinned repos — so that adding, removing, and moving an
 * entry behaves identically in all of them.
 */
withDefaults(defineProps<{
  placeholder?: string
  addLabel?: string
  /** Renders each row in the mono face, for values that are identifiers. */
  mono?: boolean
  max?: number
}>(), {
  placeholder: '',
  addLabel: 'Add row',
  mono: false,
  max: 50
})

const items = defineModel<string[]>({ required: true })

const add = () => items.value.push('')
const remove = (index: number) => items.value.splice(index, 1)

function move(index: number, direction: -1 | 1) {
  const to = index + direction
  if (to < 0 || to >= items.value.length) return

  const [entry] = items.value.splice(index, 1)
  items.value.splice(to, 0, entry ?? '')
}
</script>

<template>
  <div class="space-y-2">
    <TransitionGroup name="row">
      <div
        v-for="(_, index) in items"
        :key="index"
        class="flex items-center gap-1.5"
      >
        <UInput
          v-model="items[index]"
          class="flex-1"
          size="sm"
          :class="{ 'font-mono': mono }"
          :placeholder="placeholder"
        />

        <div class="flex shrink-0">
          <UButton
            icon="i-lucide-chevron-up"
            color="neutral"
            variant="ghost"
            size="xs"
            :disabled="index === 0"
            aria-label="Move up"
            @click="move(index, -1)"
          />
          <UButton
            icon="i-lucide-chevron-down"
            color="neutral"
            variant="ghost"
            size="xs"
            :disabled="index === items.length - 1"
            aria-label="Move down"
            @click="move(index, 1)"
          />
          <UButton
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            size="xs"
            aria-label="Remove"
            @click="remove(index)"
          />
        </div>

        <slot
          name="row-suffix"
          :index="index"
        />
      </div>
    </TransitionGroup>

    <UButton
      icon="i-lucide-plus"
      :label="addLabel"
      color="neutral"
      variant="soft"
      size="xs"
      :disabled="items.length >= max"
      @click="add"
    />
  </div>
</template>
