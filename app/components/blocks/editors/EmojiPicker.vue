<script setup lang="ts">
import { EMOJI_GROUPS } from '~/config/emoji'

/**
 * A small palette of the emoji that actually recur in profile READMEs.
 *
 * Deliberately not a full emoji keyboard — the OS already has one, and a
 * shortlist grouped by what the bullet is saying gets you to "🔭 Currently
 * working on" faster than searching would.
 */
const emit = defineEmits<{ pick: [emoji: string] }>()

const open = ref(false)

function choose(emoji: string) {
  emit('pick', emoji)
  open.value = false
}
</script>

<template>
  <UPopover v-model:open="open">
    <UButton
      icon="i-lucide-smile"
      color="neutral"
      variant="ghost"
      size="xs"
      aria-label="Insert an emoji"
    />

    <template #content>
      <div class="w-64 space-y-2 p-2">
        <div
          v-for="group in EMOJI_GROUPS"
          :key="group.group"
        >
          <p class="mb-1 text-xs font-medium text-dimmed">
            {{ group.group }}
          </p>
          <div class="flex flex-wrap gap-0.5">
            <button
              v-for="emoji in group.emoji"
              :key="`${group.group}-${emoji}`"
              type="button"
              class="emoji-key"
              @click="choose(emoji)"
            >
              {{ emoji }}
            </button>
          </div>
        </div>
      </div>
    </template>
  </UPopover>
</template>
