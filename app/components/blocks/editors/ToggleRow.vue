<script setup lang="ts">
/** Label, optional hint, and a switch. Used wherever a block has a run of flags. */
defineProps<{ label: string, hint?: string }>()

const model = defineModel<boolean>({ required: true })
</script>

<template>
  <label class="toggle-row">
    <span class="min-w-0">
      <span class="block text-sm text-muted">{{ label }}</span>
      <span
        v-if="hint"
        class="block text-xs text-dimmed"
      >{{ hint }}</span>
    </span>
    <USwitch v-model="model" />
  </label>
</template>
