<script setup lang="ts">
import { BRAND_SWATCHES } from '~/config/ui-options'

/**
 * A colour input over a value stored as a bare hex — no `#`.
 *
 * Every service these blocks talk to wants the hex unprefixed in a query
 * string, while `<input type="color">` only speaks `#rrggbb`, so the two forms
 * are converted at this boundary and nowhere else.
 */
const model = defineModel<string>({ required: true })

defineProps<{ label?: string }>()

const asInput = computed({
  get: () => {
    const value = model.value.trim().replace(/^#/, '')
    // The native picker resets itself to black on a malformed value, which
    // would silently overwrite what the user typed. Only feed it complete hex.
    return /^[0-9a-f]{6}$/i.test(value) ? `#${value}` : '#000000'
  },
  set: (value: string) => {
    model.value = value.replace(/^#/, '').toUpperCase()
  }
})

const isValid = computed(() => /^[0-9a-f]{3,8}$/i.test(model.value.trim().replace(/^#/, '')))
</script>

<template>
  <UFormField
    :label="label"
    size="sm"
  >
    <div class="space-y-1.5">
      <div class="flex items-center gap-1.5">
        <label class="swatch-input">
          <input
            v-model="asInput"
            type="color"
            aria-label="Pick a colour"
          >
        </label>

        <UInput
          v-model="model"
          class="flex-1 font-mono"
          size="sm"
          placeholder="6C20FF"
          :color="isValid ? undefined : 'error'"
          :ui="{ base: 'uppercase' }"
        >
          <template #leading>
            <span class="text-dimmed">#</span>
          </template>
        </UInput>
      </div>

      <div class="flex flex-wrap gap-1">
        <button
          v-for="swatch in BRAND_SWATCHES"
          :key="swatch.value"
          type="button"
          class="swatch"
          :class="{ 'is-active': model.replace(/^#/, '').toUpperCase() === swatch.value }"
          :style="{ background: `#${swatch.value}` }"
          :title="swatch.label"
          :aria-label="swatch.label"
          @click="model = swatch.value"
        />
      </div>
    </div>
  </UFormField>
</template>
