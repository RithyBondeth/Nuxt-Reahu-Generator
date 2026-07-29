<script setup lang="ts" generic="T extends string | number">
/**
 * A segmented control with a thumb that slides between options.
 *
 * The thumb is one absolutely positioned element driven by two CSS custom
 * properties rather than a measured offset — options are laid out on an equal
 * grid, so `--active / --count` is enough to place it, and it stays correct
 * through resizes and font changes without any JavaScript measuring the DOM.
 */
const props = defineProps<{
  items: readonly { label: string, value: T, icon?: string }[]
  /** Hides labels and shows only icons — for tight two-column rows. */
  iconOnly?: boolean
}>()

const model = defineModel<T>({ required: true })

const activeIndex = computed(() => props.items.findIndex(item => item.value === model.value))
</script>

<template>
  <div
    class="segmented"
    :style="{ '--count': items.length, '--active': Math.max(activeIndex, 0) }"
    role="radiogroup"
  >
    <span
      class="segmented__thumb"
      :class="{ 'opacity-0': activeIndex === -1 }"
      aria-hidden="true"
    />

    <button
      v-for="item in items"
      :key="String(item.value)"
      type="button"
      role="radio"
      :aria-checked="item.value === model"
      :aria-label="iconOnly ? item.label : undefined"
      :title="iconOnly ? item.label : undefined"
      class="segmented__option"
      :class="{ 'is-active': item.value === model }"
      @click="model = item.value"
    >
      <UIcon
        v-if="item.icon"
        :name="item.icon"
        class="size-3.5 shrink-0"
      />
      <span v-if="!iconOnly">{{ item.label }}</span>
    </button>
  </div>
</template>
