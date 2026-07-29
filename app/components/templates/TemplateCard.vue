<script setup lang="ts">
import type { ReadmeTemplate } from '~/core/templates'
import { renderReadme } from '~/core/render'

const props = defineProps<{
  template: ReadmeTemplate
}>()

const blocks = computed(() => props.template.blocks())
const markdown = computed(() => renderReadme(blocks.value))
const previewTheme = computed<'light' | 'dark'>(() =>
  ['quiet-craft', 'learning-in-public', 'research-ledger', 'freelance-studio'].includes(props.template.slug)
    ? 'light'
    : 'dark'
)
</script>

<template>
  <article class="template-card">
    <NuxtLink
      :to="`/templates/${template.slug}`"
      class="template-card__preview"
      :aria-label="`Preview ${template.name}`"
    >
      <div
        class="template-live-document"
        :class="`is-${previewTheme}`"
      >
        <div
          class="template-live-document__accent"
          :style="{ background: template.accent }"
        />
        <div class="template-live-document__meta">
          <span>{{ template.category }}</span>
          <span>{{ blocks.length }} blocks</span>
        </div>
        <div class="template-live-document__viewport">
          <ReadmePreview
            class="template-live-document__content"
            :source="markdown"
            :theme="previewTheme"
          />
        </div>
      </div>
      <span class="template-card__open">
        View complete template
        <UIcon name="i-lucide-arrow-up-right" />
      </span>
    </NuxtLink>

    <div class="template-card__body">
      <div>
        <p class="eyebrow text-dimmed">
          {{ template.category }}
        </p>
        <h2 class="mt-2 text-xl font-semibold">
          {{ template.name }}
        </h2>
        <p class="mt-3 text-sm leading-6 text-muted">
          {{ template.description }}
        </p>
      </div>
      <UButton
        :to="{ path: '/build', query: { template: template.slug } }"
        label="Use template"
        trailing-icon="i-lucide-arrow-right"
        color="neutral"
        variant="outline"
        class="mt-5 !rounded-sm"
      />
    </div>
  </article>
</template>
