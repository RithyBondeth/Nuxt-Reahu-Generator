<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'

const { blocks } = useReadme()
</script>

<template>
  <section class="space-y-3">
    <div class="flex items-center justify-between gap-2 px-1">
      <h2 class="flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-dimmed">
        Document
        <UBadge
          :label="String(blocks.length)"
          color="neutral"
          variant="subtle"
          size="sm"
        />
      </h2>
      <HistoryControls />
    </div>

    <!--
      The draggable owns the reorder animation, so the transition group here only
      handles blocks arriving and leaving. Running both over the same nodes makes
      a dragged card fight two transforms at once.
    -->
    <VueDraggable
      v-model="blocks"
      handle=".drag-handle"
      :animation="180"
      ghost-class="is-dragging"
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
