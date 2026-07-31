<script setup lang="ts">
import { getReadmeTemplate } from '~/core/templates'

useSeoMeta({
  title: 'Builder',
  description: 'Compose your GitHub profile README from drag-and-drop blocks.',
  robots: 'noindex, nofollow'
})

const route = useRoute()
const router = useRouter()
const toast = useToast()
const { undo, redo, replace } = useReadme()

onMounted(async () => {
  const slug = typeof route.query.template === 'string' ? route.query.template : ''
  const template = getReadmeTemplate(slug)
  if (!template) return

  replace(template.blocks())
  toast.add({
    title: `${template.name} loaded`,
    description: 'Every section is ready for you to edit.',
    icon: 'i-lucide-layout-template',
    color: 'primary'
  })

  // Remove the instruction after applying it, so refreshing later preserves
  // the user's edits instead of restoring the original template.
  await router.replace({ path: '/build' })
})

// Registered at the page level so the shortcuts are scoped to the builder.
defineShortcuts({
  meta_z: () => undo(),
  meta_shift_z: () => redo()
})
</script>

<template>
  <div class="builder-page min-h-[calc(100vh-3.5rem)]">
    <UContainer class="max-w-[96rem] py-6 sm:py-8">
      <div class="builder-masthead">
        <div>
          <div class="eyebrow flex items-center gap-2 text-muted">
            <span
              class="status-dot"
              aria-hidden="true"
            />
            Saved locally
          </div>
          <h1 class="display mt-3 text-3xl sm:text-5xl">
            Compose your profile.
          </h1>
          <p class="mt-3 max-w-xl text-sm leading-6 text-muted">
            Arrange the story on the left. Review exactly what GitHub will render on the right.
          </p>
        </div>
        <div class="builder-shortcuts">
          <span><kbd>⌘ Z</kbd> undo</span>
          <span><kbd>drag</kbd> reorder</span>
        </div>
      </div>

      <div class="builder-workspace">
        <aside class="builder-sidebar">
          <BlockList />
        </aside>
        <main class="builder-canvas">
          <ReadmePanel />
        </main>
      </div>
    </UContainer>
  </div>
</template>
