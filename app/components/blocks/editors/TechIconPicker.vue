<script setup lang="ts">
import { SERVICES } from '~/config/services'
import { ALL_TECH_ICONS, TECH_ICONS, TECH_ICON_LABELS } from '~/config/tech-icons'

const props = defineProps<{ theme: 'dark' | 'light' }>()
const selected = defineModel<string[]>({ required: true })

const query = ref('')

const selectedSet = computed(() => new Set(selected.value))

const label = (icon: string) => TECH_ICON_LABELS[icon] ?? icon

/**
 * Search flattens the groups into one result list. With ~200 icons the grouped
 * view is the wrong shape for "where is Rust" — you want the answer, not the
 * category it lives in.
 */
const results = computed(() => {
  const term = query.value.trim().toLowerCase()
  if (!term) return null

  return ALL_TECH_ICONS.filter(icon =>
    icon.includes(term) || label(icon).toLowerCase().includes(term)
  )
})

function toggle(icon: string) {
  const index = selected.value.indexOf(icon)
  if (index === -1) selected.value.push(icon)
  else selected.value.splice(index, 1)
}

/** One tiny sprite per icon, straight from skillicons — no API call on our side. */
const iconUrl = (icon: string) => `${SERVICES.skillIcons}?i=${icon}&theme=${props.theme}`
</script>

<template>
  <div class="space-y-2">
    <div class="flex items-center gap-1.5">
      <UInput
        v-model="query"
        icon="i-lucide-search"
        size="sm"
        placeholder="Search 200+ icons…"
        class="flex-1"
      >
        <template
          v-if="query"
          #trailing
        >
          <UButton
            icon="i-lucide-x"
            color="neutral"
            variant="link"
            size="xs"
            aria-label="Clear search"
            @click="query = ''"
          />
        </template>
      </UInput>

      <UButton
        v-if="selected.length"
        label="Clear"
        color="neutral"
        variant="ghost"
        size="xs"
        @click="selected = []"
      />
    </div>

    <div class="icon-grid">
      <!-- Search results: one flat list, groups suppressed. -->
      <template v-if="results">
        <div
          v-if="!results.length"
          class="p-3 text-center text-xs text-dimmed"
        >
          Nothing matches “{{ query }}”.
        </div>

        <div
          v-else
          class="flex flex-wrap gap-1.5"
        >
          <button
            v-for="icon in results"
            :key="icon"
            type="button"
            :title="label(icon)"
            :aria-pressed="selectedSet.has(icon)"
            class="icon-key"
            :class="{ 'is-selected': selectedSet.has(icon) }"
            @click="toggle(icon)"
          >
            <img
              :src="iconUrl(icon)"
              :alt="label(icon)"
              class="size-7"
              loading="lazy"
            >
          </button>
        </div>
      </template>

      <template v-else>
        <div
          v-for="(icons, group) in TECH_ICONS"
          :key="group"
        >
          <p class="mb-1.5 text-xs font-medium text-dimmed">
            {{ group }}
          </p>

          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="icon in icons"
              :key="`${group}-${icon}`"
              type="button"
              :title="label(icon)"
              :aria-pressed="selectedSet.has(icon)"
              class="icon-key"
              :class="{ 'is-selected': selectedSet.has(icon) }"
              @click="toggle(icon)"
            >
              <img
                :src="iconUrl(icon)"
                :alt="label(icon)"
                class="size-7"
                loading="lazy"
              >
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
