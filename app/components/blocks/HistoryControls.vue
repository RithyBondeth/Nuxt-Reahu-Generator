<script setup lang="ts">
const { undo, redo, canUndo, canRedo, reset } = useReadme()

function confirmReset() {
  if (window.confirm('Discard the current README and start over?')) reset()
}
</script>

<template>
  <div class="flex items-center gap-0.5">
    <UTooltip text="Undo (⌘Z)">
      <UButton
        icon="i-lucide-undo-2"
        color="neutral"
        variant="ghost"
        size="xs"
        :disabled="!canUndo"
        aria-label="Undo"
        @click="undo()"
      />
    </UTooltip>

    <UTooltip text="Redo (⌘⇧Z)">
      <UButton
        icon="i-lucide-redo-2"
        color="neutral"
        variant="ghost"
        size="xs"
        :disabled="!canRedo"
        aria-label="Redo"
        @click="redo()"
      />
    </UTooltip>

    <UTooltip text="Start over">
      <UButton
        icon="i-lucide-rotate-ccw"
        color="neutral"
        variant="ghost"
        size="xs"
        aria-label="Reset"
        @click="confirmReset"
      />
    </UTooltip>
  </div>
</template>
