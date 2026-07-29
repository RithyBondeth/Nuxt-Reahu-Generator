<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'

const { blocks } = useReadme()
</script>

<template>
  <section class="space-y-3">
    <div class="flex items-center justify-between gap-2">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-dimmed">
        Blocks
      </h2>
      <HistoryControls />
    </div>

    <VueDraggable
      v-model="blocks"
      handle=".drag-handle"
      :animation="180"
      ghost-class="opacity-40"
      class="space-y-2"
    >
      <BlockCard
        v-for="(block, index) in blocks"
        :key="block.id"
        :block="block"
        :index="index"
        :total="blocks.length"
      />
    </VueDraggable>

    <p
      v-if="!blocks.length"
      class="rounded-lg border border-dashed border-default p-6 text-center text-sm text-dimmed"
    >
      No blocks yet — add one below.
    </p>

    <AddBlockMenu />
  </section>
</template>
