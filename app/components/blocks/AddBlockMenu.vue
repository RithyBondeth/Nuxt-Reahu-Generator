<script setup lang="ts">
import { BLOCK_CATEGORIES, BLOCK_DEFINITIONS, BLOCK_ORDER } from '~/core/blocks'
import type { BlockCategory } from '~/core/blocks'
import type { BlockType } from '~/types'

/**
 * The block palette.
 *
 * At six block types a popover list was the right shape. At seventeen it is
 * not: you cannot see them all at once, and scanning beats scrolling when you
 * are choosing rather than confirming. So this is a searchable grid grouped by
 * what the block is for, with the keyboard as the fast path.
 */
const { add } = useReadme()

const open = ref(false)
const query = ref('')
const category = ref<BlockCategory | 'All'>('All')

const CATEGORY_FILTERS = [
  { label: 'All', value: 'All' as const, icon: 'i-lucide-layout-grid' },
  ...BLOCK_CATEGORIES.map(({ label, icon }) => ({ label, value: label, icon }))
]

/** Label, description, and keywords all count — people search for "animation". */
function matches(type: BlockType, term: string) {
  const definition = BLOCK_DEFINITIONS[type]
  const haystack = [
    definition.label,
    definition.description,
    ...(definition.keywords ?? [])
  ].join(' ').toLowerCase()

  return haystack.includes(term)
}

const results = computed(() => {
  const term = query.value.trim().toLowerCase()

  return BLOCK_ORDER.filter((type) => {
    const inCategory = category.value === 'All'
      || BLOCK_DEFINITIONS[type].category === category.value

    return inCategory && (!term || matches(type, term))
  })
})

function choose(type: BlockType) {
  add(type)
  open.value = false
}

/** Enter adds the only sensible candidate rather than making you reach for it. */
function onEnter() {
  const first = results.value[0]
  if (first) choose(first)
}

// A fresh palette every time: a stale search from last time reads as a bug.
watch(open, (isOpen) => {
  if (isOpen) return
  query.value = ''
  category.value = 'All'
})
</script>

<template>
  <UModal
    v-model:open="open"
    title="Add a block"
    :description="`${BLOCK_ORDER.length} block types — search, or pick a category.`"
    :ui="{ content: 'max-w-2xl' }"
  >
    <UButton
      icon="i-lucide-plus"
      label="Add block"
      color="neutral"
      variant="subtle"
      block
    />

    <template #body>
      <div class="space-y-3">
        <UInput
          v-model="query"
          icon="i-lucide-search"
          placeholder="Search blocks — try “graph” or “animation”…"
          autofocus
          class="w-full"
          @keydown.enter.prevent="onEnter"
        />

        <div class="flex flex-wrap gap-1">
          <button
            v-for="filter in CATEGORY_FILTERS"
            :key="filter.value"
            type="button"
            class="chip chip--icon"
            :class="{ 'is-active': category === filter.value }"
            @click="category = filter.value"
          >
            <UIcon
              :name="filter.icon"
              class="size-3.5"
            />
            {{ filter.label }}
          </button>
        </div>

        <div
          v-if="!results.length"
          class="rounded-lg border border-dashed border-default p-8 text-center text-sm text-dimmed"
        >
          No block matches “{{ query }}”.
        </div>

        <div
          v-else
          class="grid gap-1.5 sm:grid-cols-2"
        >
          <button
            v-for="(type, index) in results"
            :key="type"
            type="button"
            class="palette-card"
            :style="{ '--stagger': `${Math.min(index, 12) * 22}ms` }"
            @click="choose(type)"
          >
            <span class="palette-card__icon">
              <UIcon
                :name="BLOCK_DEFINITIONS[type].icon"
                class="size-4"
              />
            </span>

            <span class="min-w-0 flex-1">
              <span class="flex items-center gap-1.5">
                <span class="text-sm font-medium">{{ BLOCK_DEFINITIONS[type].label }}</span>
                <UBadge
                  v-if="BLOCK_DEFINITIONS[type].needsSetup"
                  label="setup"
                  color="warning"
                  variant="soft"
                  size="sm"
                />
              </span>
              <span class="block text-xs text-dimmed">
                {{ BLOCK_DEFINITIONS[type].description }}
              </span>
            </span>

            <UIcon
              name="i-lucide-plus"
              class="palette-card__add size-4 shrink-0"
            />
          </button>
        </div>
      </div>
    </template>
  </UModal>
</template>
