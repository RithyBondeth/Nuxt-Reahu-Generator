<script setup lang="ts">
import { BLOCK_DEFINITIONS, BLOCK_ORDER } from '~/core/blocks'

/**
 * Driven by the builder's own block registry rather than a hand-kept marketing
 * list, so the page cannot drift out of sync with what the tool actually offers.
 *
 * The stagger is capped rather than proportional: at one card per 70ms a
 * seventeen-card grid would still be arriving a second after you reached it,
 * which stops reading as a reveal and starts reading as lag.
 */
const STAGGER_STEP = 55
const STAGGER_CAP = 8

const delay = (index: number) => Math.min(index, STAGGER_CAP) * STAGGER_STEP
</script>

<template>
  <ul class="border-t border-default">
    <li
      v-for="(type, index) in BLOCK_ORDER"
      :key="type"
      v-reveal="delay(index)"
      class="reveal group grid grid-cols-[2.5rem_1fr_auto] items-start gap-3 border-b border-default py-5 sm:grid-cols-[3rem_12rem_1fr_auto]"
    >
      <span class="font-mono text-xs text-dimmed">{{ String(index + 1).padStart(2, '0') }}</span>
      <h3 class="text-sm font-semibold">
        {{ BLOCK_DEFINITIONS[type].label }}
      </h3>
      <p class="col-span-2 text-sm text-muted sm:col-span-1">
        {{ BLOCK_DEFINITIONS[type].description }}
      </p>
      <UIcon
        :name="BLOCK_DEFINITIONS[type].icon"
        class="size-4 text-dimmed transition-colors group-hover:text-primary"
      />
    </li>
  </ul>
</template>
