<script setup lang="ts">
useSeoMeta({
  title: 'Builder — Profile README Builder',
  description: 'Compose your GitHub profile README from drag-and-drop blocks.'
})

const { undo, redo } = useReadme()

// Registered at the page level so the shortcuts are scoped to the builder.
defineShortcuts({
  meta_z: () => undo(),
  meta_shift_z: () => redo()
})
</script>

<template>
  <UContainer class="py-6">
    <div class="grid gap-4 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:items-start">
      <BlockList />
      <ReadmePanel />
    </div>
  </UContainer>
</template>
