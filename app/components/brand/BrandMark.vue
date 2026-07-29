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
  <span
    class="inline-flex items-center gap-2.5"
    role="img"
    aria-label="Reahu Generator"
  >
    <span
      class="brand-icon"
      :class="size === 'md' ? 'size-9' : 'size-7'"
      aria-hidden="true"
    >
      <UIcon
        name="i-lucide-blocks"
        :class="size === 'md' ? 'size-5' : 'size-4'"
      />
    </span>
    <!-- Below `sm` the header is tight enough that the wordmark wraps to two
         lines, so the mark carries the brand on its own there. -->
    <span
      v-if="wordmark"
      aria-hidden="true"
      class="hidden whitespace-nowrap font-semibold tracking-[-0.035em] text-default sm:inline"
      :class="size === 'md' ? 'text-xl' : 'text-base'"
    >Reahu <span class="font-normal text-muted">Generator</span></span>
  </span>
</template>
