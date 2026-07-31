<script setup lang="ts">
export type PreviewMode = 'preview' | 'markdown'

const mode = defineModel<PreviewMode>('mode', { required: true })
const theme = defineModel<'light' | 'dark'>('theme', { required: true })

const { markdown, shareUrl, download } = useReadme()

const toast = useToast()
const { copy, isSupported } = useClipboard()

const MODES: PreviewMode[] = ['preview', 'markdown']

async function copyText(value: string, success: {
  title: string
  description?: string
}) {
  try {
    if (!toValue(isSupported)) throw new Error('Clipboard API unavailable')

    await copy(value)
    toast.add({
      ...success,
      icon: 'i-lucide-check',
      color: 'success'
    })
  } catch {
    toast.add({
      title: 'Could not copy',
      description: 'Your browser blocked clipboard access. Select the Markdown and copy it manually.',
      icon: 'i-lucide-triangle-alert',
      color: 'error'
    })
  }
}

async function copyMarkdown() {
  await copyText(markdown.value, { title: 'Markdown copied' })
}

async function copyShareLink() {
  await copyText(shareUrl(), {
    title: 'Share link copied',
    description: 'The whole document is encoded in the link — nothing is stored on a server.'
  })
}
</script>

<template>
  <div class="preview-toolbar">
    <div class="flex border border-default bg-default p-0.5">
      <button
        v-for="option in MODES"
        :key="option"
        type="button"
        class="px-3 py-1 text-xs font-medium capitalize transition"
        :class="mode === option ? 'bg-elevated text-default' : 'text-dimmed hover:text-default'"
        :aria-pressed="mode === option"
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
