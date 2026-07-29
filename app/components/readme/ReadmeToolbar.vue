<script setup lang="ts">
export type PreviewMode = 'preview' | 'markdown'

const mode = defineModel<PreviewMode>('mode', { required: true })
const theme = defineModel<'light' | 'dark'>('theme', { required: true })

const { markdown, shareUrl, download } = useReadme()

const toast = useToast()
const { copy } = useClipboard()

const MODES: PreviewMode[] = ['preview', 'markdown']

async function copyMarkdown() {
  await copy(markdown.value)
  toast.add({ title: 'Markdown copied', icon: 'i-lucide-check', color: 'success' })
}

async function copyShareLink() {
  await copy(shareUrl())
  toast.add({
    title: 'Share link copied',
    description: 'The whole document is encoded in the link — nothing is stored on a server.',
    icon: 'i-lucide-link',
    color: 'success'
  })
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-2 border-b border-default bg-elevated/40 px-3 py-2">
    <div class="flex rounded-md bg-elevated p-0.5">
      <button
        v-for="option in MODES"
        :key="option"
        type="button"
        class="rounded px-2.5 py-1 text-xs font-medium capitalize transition"
        :class="mode === option ? 'bg-default shadow-sm' : 'text-dimmed hover:text-default'"
        @click="mode = option"
      >
        {{ option }}
      </button>
    </div>

    <UTooltip
      v-if="mode === 'preview'"
      text="GitHub renders light and dark differently"
    >
      <UButton
        :icon="theme === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'"
        color="neutral"
        variant="ghost"
        size="xs"
        aria-label="Toggle preview theme"
        @click="theme = theme === 'dark' ? 'light' : 'dark'"
      />
    </UTooltip>

    <div class="ms-auto flex items-center gap-1.5">
      <UButton
        icon="i-lucide-link"
        label="Share"
        color="neutral"
        variant="ghost"
        size="xs"
        @click="copyShareLink"
      />
      <UButton
        icon="i-lucide-clipboard"
        label="Copy"
        color="neutral"
        variant="ghost"
        size="xs"
        @click="copyMarkdown"
      />
      <UButton
        icon="i-lucide-download"
        label="README.md"
        size="xs"
        @click="download()"
      />
    </div>
  </div>
</template>
