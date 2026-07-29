<script setup lang="ts">
import { SOCIAL_PLATFORMS } from '~/config/social-platforms'
import type { SocialLink, SocialPlatform } from '~/types'

const link = defineModel<SocialLink>({ required: true })

defineEmits<{ remove: [] }>()

const PLATFORM_OPTIONS = Object.entries(SOCIAL_PLATFORMS).map(([value, definition]) => ({
  label: definition.label,
  value: value as SocialPlatform
}))
</script>

<template>
  <div class="flex items-center gap-2">
    <USelect
      v-model="link.platform"
      :items="PLATFORM_OPTIONS"
      class="w-32 shrink-0"
    />
    <UInput
      v-model="link.value"
      :placeholder="SOCIAL_PLATFORMS[link.platform].placeholder"
      class="flex-1"
    />
    <UButton
      icon="i-lucide-x"
      color="neutral"
      variant="ghost"
      size="xs"
      aria-label="Remove link"
      @click="$emit('remove')"
    />
  </div>
</template>
