<script setup lang="ts">
import {
  README_TEMPLATES,
  TEMPLATE_CATEGORIES,
  type TemplateCategory
} from '~/core/templates'

useSeoMeta({
  title: 'README Templates',
  description: 'Start with a complete GitHub profile README and make every section your own.'
})

const activeCategory = ref<'All' | TemplateCategory>('All')

const visibleTemplates = computed(() =>
  activeCategory.value === 'All'
    ? README_TEMPLATES
    : README_TEMPLATES.filter(template => template.category === activeCategory.value)
)
</script>

<template>
  <div class="templates-page">
    <section class="templates-hero">
      <UContainer class="max-w-[96rem] py-14 sm:py-20">
        <div class="grid gap-10 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <div>
            <p class="eyebrow enter d-1 flex items-center gap-2 text-muted">
              <span
                class="status-dot"
                aria-hidden="true"
              />
              Complete starting points
            </p>
            <h1 class="display enter d-2 mt-6 max-w-4xl text-5xl sm:text-7xl">
              Pick a profile.<br>
              <span class="text-gradient">Make it yours.</span>
            </h1>
          </div>
          <div class="enter d-3 lg:pb-1">
            <p class="max-w-xl text-base leading-7 text-muted">
              A growing library of intentional README structures for different kinds of work. Preview the complete result, then edit every word, block, and detail.
            </p>
            <div class="mt-6 flex items-center gap-5 border-t border-default pt-5 text-xs text-dimmed">
              <span>{{ README_TEMPLATES.length }} templates</span>
              <span>Fully editable</span>
              <span>No account</span>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <section class="py-10 sm:py-14">
      <UContainer class="max-w-[96rem]">
        <div class="template-filters">
          <span class="eyebrow me-2 text-dimmed">Show</span>
          <button
            v-for="category in TEMPLATE_CATEGORIES"
            :key="category"
            type="button"
            class="chip"
            :class="{ 'is-active': activeCategory === category }"
            :aria-pressed="activeCategory === category"
            @click="activeCategory = category"
          >
            {{ category }}
          </button>
        </div>

        <TransitionGroup
          name="template-list"
          tag="div"
          class="template-grid mt-8"
        >
          <TemplateCard
            v-for="template in visibleTemplates"
            :key="template.slug"
            :template="template"
          />
        </TransitionGroup>
      </UContainer>
    </section>

    <section class="template-note">
      <UContainer class="max-w-[96rem] py-12 sm:py-16">
        <div class="grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <span class="template-note__number">01</span>
          <div>
            <h2 class="text-2xl font-semibold">
              Choose structure first. Personalize second.
            </h2>
            <p class="mt-2 max-w-2xl text-sm leading-6 text-muted">
              A template only replaces your current draft when you choose “Use template.” After that, it behaves exactly like any README you build from scratch.
            </p>
          </div>
          <UButton
            to="/build"
            label="Start from scratch"
            trailing-icon="i-lucide-arrow-right"
            color="neutral"
            variant="ghost"
            class="!rounded-sm"
          />
        </div>
      </UContainer>
    </section>
  </div>
</template>
