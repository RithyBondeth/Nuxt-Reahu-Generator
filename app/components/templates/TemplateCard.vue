<script setup lang="ts">
import type { ReadmeTemplate } from '~/core/templates'

const props = defineProps<{
  template: ReadmeTemplate
}>()

const blockTypes = computed(() => props.template.blocks().map(block => block.type))
const toolCount = computed(() => {
  const stack = props.template.blocks().find(block => block.type === 'techStack')
  return stack?.type === 'techStack' ? stack.props.icons.length : 0
})
</script>

<template>
  <article class="template-card">
    <NuxtLink
      :to="`/templates/${template.slug}`"
      class="template-card__preview"
      :aria-label="`Preview ${template.name}`"
    >
      <div class="template-mini">
        <div
          class="template-mini__accent"
          :style="{ background: template.accent }"
        />
        <div class="template-mini__topline">
          <span>{{ template.category }}</span>
          <span>{{ blockTypes.length }} blocks</span>
        </div>
        <div class="template-mini__identity">
          <span class="template-mini__avatar">
            {{ template.name.charAt(0) }}
          </span>
          <div>
            <strong>{{ template.name }}</strong>
            <small>{{ template.audience }}</small>
          </div>
        </div>
        <div class="template-mini__rule" />
        <div class="template-mini__copy">
          <span />
          <span />
          <span />
        </div>
        <div class="template-mini__tokens">
          <i
            v-for="index in Math.min(toolCount || 5, 8)"
            :key="index"
          />
        </div>
        <div class="template-mini__panels">
          <span />
          <span />
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
