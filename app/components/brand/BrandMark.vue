<script setup lang="ts">
withDefaults(defineProps<{
  /** Hides the wordmark when the logo alone carries enough context. */
  wordmark?: boolean
  size?: 'sm' | 'md'
}>(), {
  wordmark: true,
  size: 'sm'
})
</script>

<template>
  <span class="inline-flex items-center gap-2.5">
    <img
      src="/reahu.png"
      alt="Reahu Generator"
      :class="size === 'md' ? 'size-9' : 'size-7'"
      width="36"
      height="36"
    >
    <span
      v-if="wordmark"
      class="display text-default"
      :class="size === 'md' ? 'text-xl' : 'text-base'"
    >Reahu <span class="text-muted">Generator</span></span>
  </span>
</template>
