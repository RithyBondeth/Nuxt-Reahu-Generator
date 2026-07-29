<script setup lang="ts">
useSeoMeta({
  title: 'Builder',
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
  <div class="builder-page min-h-[calc(100vh-4rem)]">
    <UContainer class="max-w-[90rem] py-8 sm:py-10">
      <div class="mb-8 flex flex-col gap-4 border-b border-default pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div class="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            <span
              class="status-dot"
              aria-hidden="true"
            />
            Saved locally
          </div>
          <h1 class="display mt-3 text-3xl sm:text-4xl">
            README builder
          </h1>
          <p class="mt-2 text-sm text-muted">
            Shape the document on the left. See the final Markdown on the right.
          </p>
        </div>
        <p class="hidden font-mono text-xs text-dimmed sm:block">
          ⌘Z to undo · drag to reorder
        </p>
      </div>

      <div class="grid gap-6 lg:grid-cols-[minmax(0,27rem)_minmax(0,1fr)] lg:items-start">
        <BlockList />
        <ReadmePanel />
      </div>
    </UContainer>
  </div>
</template>
