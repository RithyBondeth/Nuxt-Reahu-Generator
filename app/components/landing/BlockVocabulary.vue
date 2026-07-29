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
      v-for="(type, index) in BLOCK_ORDER"
      :key="type"
      v-reveal="index * 70"
      class="reveal lift group relative overflow-hidden rounded-2xl border border-default bg-elevated/40 p-5 backdrop-blur-sm"
    >
      <!-- A wash of corona light that arrives with the pointer. -->
      <div
        class="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-primary/25 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />

      <div class="relative">
        <span class="inline-flex size-9 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
          <UIcon
            :name="BLOCK_DEFINITIONS[type].icon"
            class="size-4.5 text-primary"
          />
        </span>

        <h3 class="mt-3.5 text-sm font-semibold">
          {{ BLOCK_DEFINITIONS[type].label }}
        </h3>
        <p class="mt-1 text-sm text-muted">
          {{ BLOCK_DEFINITIONS[type].description }}
        </p>
      </div>
    </li>
  </ul>
</template>
