<script setup lang="ts">
import { PLATFORM_OPTIONS, SOCIAL_PLATFORMS } from '~/config/social-platforms'
import type { SocialLink } from '~/types'

const link = defineModel<SocialLink>({ required: true })

defineEmits<{ remove: [] }>()

const platform = computed(() => SOCIAL_PLATFORMS[link.value.platform])
</script>

<template>
  <div class="flex items-center gap-1.5">
    <USelectMenu
      v-model="link.platform"
      :items="PLATFORM_OPTIONS"
      value-key="value"
      :icon="`i-simple-icons-${platform.logo}`"
      size="sm"
      class="w-40 shrink-0"
    />

    <UInput
      v-model="link.value"
      :placeholder="platform.placeholder"
      size="sm"
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
