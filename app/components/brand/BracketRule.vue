<script setup lang="ts">
/**
 * One half of the logo's bracket pair, drawn at display scale.
 *
 * These flank the hero's disc the way they flank the eclipse in the mark, which
 * makes them structural rather than decorative: the brackets are the tool, the
 * disc is your document.
 */
defineProps<{ side: 'left' | 'right' }>()
</script>

<template>
  <svg
    viewBox="0 0 44 132"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      :d="side === 'left' ? 'M36 10 L10 66 L36 122' : 'M8 10 L34 66 L8 122'"
      :stroke="side === 'left' ? 'var(--color-violet-500)' : 'var(--color-sky-500)'"
      stroke-width="13"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
