<script setup lang="ts">
import type { PreviewMode } from './ReadmeToolbar.vue'

const { markdown } = useReadme()

const mode = ref<PreviewMode>('preview')
// Independent of the app's own colour mode on purpose: you can inspect the
// light rendering while working in a dark UI.
const theme = ref<'light' | 'dark'>('dark')
</script>

<template>
  <section class="lg:sticky lg:top-20">
    <div class="overflow-hidden rounded-xl border border-default bg-default shadow-sm">
      <ReadmeToolbar
        v-model:mode="mode"
        v-model:theme="theme"
      />

      <div class="max-h-[calc(100vh-10rem)] overflow-auto">
        <ReadmePreview
          v-if="mode === 'preview'"
          :source="markdown"
          :theme="theme"
        />
        <pre
          v-else
          class="p-4 font-mono text-xs leading-relaxed"
        ><code>{{ markdown }}</code></pre>
      </div>
    </div>

    <p class="mt-3 px-1 text-xs leading-5 text-dimmed">
      Save as <code class="text-default">README.md</code> in a repo named exactly your GitHub username to make it your profile.
    </p>
  </section>
</template>
