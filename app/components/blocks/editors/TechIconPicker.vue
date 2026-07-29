<script setup lang="ts">
import { SERVICES } from '~/config/services'
import { TECH_ICONS } from '~/config/tech-icons'

const props = defineProps<{ theme: 'dark' | 'light' }>()
const selected = defineModel<string[]>({ required: true })

const selectedSet = computed(() => new Set(selected.value))

function toggle(icon: string) {
  const index = selected.value.indexOf(icon)
  if (index === -1) selected.value.push(icon)
  else selected.value.splice(index, 1)
}

/** One tiny sprite per icon, straight from skillicons — no API call on our side. */
const iconUrl = (icon: string) => `${SERVICES.skillIcons}?i=${icon}&theme=${props.theme}`
</script>

<template>
  <div class="max-h-72 space-y-3 overflow-y-auto rounded-md border border-default p-2">
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
          :title="icon"
          class="rounded-md border p-1 transition hover:scale-110"
          :class="selectedSet.has(icon)
            ? 'border-primary bg-primary/10'
            : 'border-transparent opacity-50 hover:opacity-100'"
          @click="toggle(icon)"
        >
          <img
            :src="iconUrl(icon)"
            :alt="icon"
            class="size-7"
            loading="lazy"
          >
        </button>
      </div>
    </div>
  </div>
</template>
