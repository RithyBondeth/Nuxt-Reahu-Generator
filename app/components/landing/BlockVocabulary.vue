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
  <ul class="vocabulary-grid">
    <li
      v-for="(type, index) in BLOCK_ORDER"
      :key="type"
      v-reveal="delay(index)"
      class="vocabulary-card reveal group"
    >
      <div class="flex items-start justify-between">
        <span class="font-mono text-xs text-dimmed">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="vocabulary-card__icon">
          <UIcon
            :name="BLOCK_DEFINITIONS[type].icon"
            class="size-4"
          />
        </span>
      </div>
      <h3 class="mt-10 text-base font-semibold">
        {{ BLOCK_DEFINITIONS[type].label }}
      </h3>
      <p class="mt-2 text-sm leading-6 text-muted">
        {{ BLOCK_DEFINITIONS[type].description }}
      </p>
    </li>
  </ul>
</template>
