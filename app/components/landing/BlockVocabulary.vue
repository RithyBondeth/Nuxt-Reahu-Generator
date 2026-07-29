<script setup lang="ts">
import { BLOCK_DEFINITIONS, BLOCK_ORDER } from '~/core/blocks'

/**
 * Driven by the builder's own block registry rather than a hand-kept marketing
 * list, so the page cannot drift out of sync with what the tool actually offers.
 */
</script>

<template>
  <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
    <li
      v-for="type in BLOCK_ORDER"
      :key="type"
      class="rounded-xl border border-default bg-elevated/30 p-5"
    >
      <UIcon
        :name="BLOCK_DEFINITIONS[type].icon"
        class="size-5 text-primary"
      />
      <h3 class="mt-3 text-sm font-semibold">
        {{ BLOCK_DEFINITIONS[type].label }}
      </h3>
      <p class="mt-1 text-sm text-muted">
        {{ BLOCK_DEFINITIONS[type].description }}
      </p>
    </li>
  </ul>
</template>
