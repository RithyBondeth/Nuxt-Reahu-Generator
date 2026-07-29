<script setup lang="ts">
import { BLOCK_DEFINITIONS } from '~/core/blocks'
import { getReadmeTemplate } from '~/core/templates'
import { renderReadme } from '~/core/render'

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const template = computed(() => getReadmeTemplate(slug.value))

if (!template.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Template not found'
  })
}

const blocks = computed(() => template.value!.blocks())
const markdown = computed(() => renderReadme(blocks.value))
const previewTheme = ref<'light' | 'dark'>('dark')

useSeoMeta({
  title: () => `${template.value!.name} Template`,
  description: () => template.value!.description
})
</script>

<template>
  <div
    v-if="template"
    class="template-detail-page"
  >
    <section class="template-detail-hero">
      <UContainer class="max-w-[96rem] py-10 sm:py-14">
        <NuxtLink
          to="/templates"
          class="mb-9 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-default"
        >
          <UIcon name="i-lucide-arrow-left" />
          All templates
        </NuxtLink>

        <div class="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p class="eyebrow flex items-center gap-2 text-muted">
              <span
                class="size-2"
                :style="{ background: template.accent }"
                aria-hidden="true"
              />
              {{ template.category }} template
            </p>
            <h1 class="display mt-5 text-5xl sm:text-7xl">
              {{ template.name }}
            </h1>
            <p class="mt-6 max-w-2xl text-base leading-7 text-muted">
              {{ template.description }}
            </p>
          </div>

          <UButton
            :to="{ path: '/build', query: { template: template.slug } }"
            label="Use this template"
            trailing-icon="i-lucide-arrow-right"
            size="xl"
            class="!rounded-sm"
          />
        </div>
      </UContainer>
    </section>

    <UContainer class="max-w-[96rem] py-8 sm:py-12">
      <div class="template-detail-layout">
        <aside class="template-detail-sidebar">
          <div>
            <p class="eyebrow text-dimmed">
              Designed for
            </p>
            <p class="mt-3 text-sm leading-6">
              {{ template.audience }}
            </p>
          </div>

          <div class="mt-8 border-t border-default pt-8">
            <div class="flex items-center justify-between">
              <p class="eyebrow text-dimmed">
                Included blocks
              </p>
              <span class="font-mono text-xs text-dimmed">{{ blocks.length }}</span>
            </div>
            <ol class="mt-4">
              <li
                v-for="(block, index) in blocks"
                :key="block.id"
                class="template-block-row"
              >
                <span>0{{ index + 1 }}</span>
                <UIcon :name="BLOCK_DEFINITIONS[block.type].icon" />
                <strong>{{ BLOCK_DEFINITIONS[block.type].label }}</strong>
              </li>
            </ol>
          </div>

          <div class="mt-8 border-t border-default pt-8">
            <p class="text-xs leading-5 text-dimmed">
              Names, links, usernames, and project details are realistic placeholders. Replace them with your own in the builder.
            </p>
          </div>
        </aside>

        <main class="template-detail-preview">
          <div class="template-preview-toolbar">
            <div>
              <span class="status-dot" />
              <span>Complete preview</span>
            </div>
            <div class="flex items-center gap-1">
              <button
                type="button"
                class="template-theme-key"
                :class="{ 'is-active': previewTheme === 'light' }"
                aria-label="Preview light GitHub theme"
                :aria-pressed="previewTheme === 'light'"
                @click="previewTheme = 'light'"
              >
                <UIcon name="i-lucide-sun" />
              </button>
              <button
                type="button"
                class="template-theme-key"
                :class="{ 'is-active': previewTheme === 'dark' }"
                aria-label="Preview dark GitHub theme"
                :aria-pressed="previewTheme === 'dark'"
                @click="previewTheme = 'dark'"
              >
                <UIcon name="i-lucide-moon" />
              </button>
            </div>
          </div>
          <div class="template-preview-scroll">
            <ReadmePreview
              :source="markdown"
              :theme="previewTheme"
            />
          </div>
        </main>
      </div>
    </UContainer>

    <section class="template-detail-cta">
      <UContainer class="max-w-[96rem] py-12 sm:py-16">
        <div class="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="eyebrow text-[#111111]/60">
              Ready when you are
            </p>
            <h2 class="display mt-3 text-3xl text-[#111111] sm:text-5xl">
              Turn this into your profile.
            </h2>
          </div>
          <UButton
            :to="{ path: '/build', query: { template: template.slug } }"
            label="Customize in builder"
            trailing-icon="i-lucide-arrow-right"
            size="xl"
            color="neutral"
            class="!rounded-sm"
          />
        </div>
      </UContainer>
    </section>
  </div>
</template>
