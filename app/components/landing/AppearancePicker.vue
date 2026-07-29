<script setup lang="ts">
import {
  ACCENT_THEMES,
  FONT_THEMES,
  useLandingAppearance
} from '~/composables/useLandingAppearance'

const open = ref(false)
const { accentTheme, fontTheme, ready, resetPreferences } = useLandingAppearance()

const hasCustomPreference = computed(() =>
  accentTheme.value !== 'lime' || fontTheme.value !== 'modern'
)
</script>

<template>
  <UPopover
    v-model:open="open"
    :content="{ align: 'end', side: 'bottom', sideOffset: 8 }"
  >
    <UButton
      icon="i-lucide-palette"
      color="neutral"
      variant="ghost"
      aria-label="Customize colors and fonts"
      title="Customize colors and fonts"
      class="appearance-trigger"
    >
      <span
        v-if="hasCustomPreference"
        class="appearance-trigger__indicator"
        aria-hidden="true"
      />
    </UButton>

    <template #content>
      <div class="appearance-panel">
        <div class="appearance-panel__header">
          <div>
            <p class="text-sm font-semibold">
              Make it yours
            </p>
            <p class="mt-0.5 text-xs text-muted">
              Saved automatically on this device.
            </p>
          </div>
          <UButton
            v-if="hasCustomPreference"
            label="Reset"
            color="neutral"
            variant="link"
            size="xs"
            class="px-0"
            @click="resetPreferences"
          />
        </div>

        <fieldset :disabled="!ready">
          <legend class="appearance-panel__legend">
            Accent color
          </legend>
          <div class="appearance-color-grid">
            <button
              v-for="theme in ACCENT_THEMES"
              :key="theme.id"
              type="button"
              class="appearance-color"
              :class="{ 'is-selected': accentTheme === theme.id }"
              :aria-pressed="accentTheme === theme.id"
              :aria-label="`${theme.label}: ${theme.description}`"
              @click="accentTheme = theme.id"
            >
              <span
                class="appearance-color__swatch"
                :style="{ backgroundColor: theme.swatch }"
                aria-hidden="true"
              >
                <UIcon
                  v-if="accentTheme === theme.id"
                  name="i-lucide-check"
                  class="size-3.5"
                />
              </span>
              <span>{{ theme.label }}</span>
            </button>
          </div>
        </fieldset>

        <fieldset
          class="mt-5"
          :disabled="!ready"
        >
          <legend class="appearance-panel__legend">
            Font style
          </legend>
          <div class="appearance-font-grid">
            <button
              v-for="theme in FONT_THEMES"
              :key="theme.id"
              type="button"
              class="appearance-font"
              :class="[
                `appearance-font--${theme.id}`,
                { 'is-selected': fontTheme === theme.id }
              ]"
              :aria-pressed="fontTheme === theme.id"
              @click="fontTheme = theme.id"
            >
              <span class="appearance-font__sample">{{ theme.sample }}</span>
              <span class="min-w-0 text-left">
                <strong>{{ theme.label }}</strong>
                <small>{{ theme.description }}</small>
              </span>
              <UIcon
                v-if="fontTheme === theme.id"
                name="i-lucide-check"
                class="ms-auto size-4 shrink-0 text-primary"
              />
            </button>
          </div>
        </fieldset>
      </div>
    </template>
  </UPopover>
</template>
