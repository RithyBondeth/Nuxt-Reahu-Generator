<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'

type DemoBlockKind = 'header' | 'typing' | 'about' | 'tech' | 'stats' | 'projects' | 'socials'

interface DemoBlock {
  id: DemoBlockKind
  label: string
  icon: string
}

const CATALOG: DemoBlock[] = [
  { id: 'header', label: 'Header', icon: 'i-lucide-heading-1' },
  { id: 'typing', label: 'Typing text', icon: 'i-lucide-type' },
  { id: 'about', label: 'About me', icon: 'i-lucide-user' },
  { id: 'tech', label: 'Tech stack', icon: 'i-lucide-layers' },
  { id: 'stats', label: 'GitHub stats', icon: 'i-lucide-bar-chart-3' },
  { id: 'projects', label: 'Projects', icon: 'i-lucide-folder-git-2' },
  { id: 'socials', label: 'Social links', icon: 'i-lucide-at-sign' }
]

const demoBlocks = ref<DemoBlock[]>(CATALOG.slice(0, 5))
const activeId = ref<DemoBlockKind>('about')
const paletteOpen = ref(false)
const previewTheme = ref<'light' | 'dark'>('dark')
const previewCanvas = ref<HTMLElement | null>(null)

const profile = reactive({
  name: 'Rithy Bondeth',
  tagline: 'Full-stack developer · Phnom Penh',
  typing: 'Building thoughtful digital products',
  about: 'I build thoughtful web products and practical AI systems that turn complex work into clear experiences.',
  tools: ['TypeScript', 'Nuxt', 'Python', 'Postgres', 'Flutter']
})

const activeBlock = computed(() => demoBlocks.value.find(block => block.id === activeId.value))
const availableBlocks = computed(() => {
  const used = new Set(demoBlocks.value.map(block => block.id))
  return CATALOG.filter(block => !used.has(block.id))
})

const toolsInput = computed({
  get: () => profile.tools.join(', '),
  set: (value: string) => {
    profile.tools = value
      .split(',')
      .map(tool => tool.trim())
      .filter(Boolean)
      .slice(0, 6)
  }
})

async function selectBlock(id: DemoBlockKind) {
  activeId.value = id
  paletteOpen.value = false

  await nextTick()
  const section = previewCanvas.value?.querySelector<HTMLElement>(`[data-demo-block="${id}"]`)
  if (section && previewCanvas.value) {
    previewCanvas.value.scrollTo({
      top: Math.max(0, section.offsetTop - previewCanvas.value.offsetTop - 24),
      behavior: 'smooth'
    })
  }
}

function addBlock(block: DemoBlock) {
  demoBlocks.value.push(block)
  void selectBlock(block.id)
}

function removeBlock(id: DemoBlockKind) {
  if (demoBlocks.value.length === 1) return

  const index = demoBlocks.value.findIndex(block => block.id === id)
  demoBlocks.value.splice(index, 1)

  if (activeId.value === id) {
    activeId.value = demoBlocks.value[Math.min(index, demoBlocks.value.length - 1)]!.id
  }
}
</script>

<template>
  <div class="workbench-preview enter-bloom d-6">
    <div class="workbench-preview__bar">
      <div class="flex items-center gap-2">
        <span class="grid size-5 place-items-center bg-primary text-[10px] font-bold text-slate-950">R</span>
        <span class="text-xs font-medium">profile.readme</span>
      </div>
      <span class="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-muted">
        <span class="status-dot" />
        Interactive demo
      </span>
      <button
        type="button"
        class="workbench-preview__mobile-theme lg:hidden"
        :aria-label="`Switch preview to ${previewTheme === 'dark' ? 'light' : 'dark'} mode`"
        @click="previewTheme = previewTheme === 'dark' ? 'light' : 'dark'"
      >
        <UIcon
          :name="previewTheme === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'"
          class="size-3.5"
        />
      </button>
    </div>

    <div class="workbench-preview__body">
      <aside class="workbench-preview__rail">
        <button
          type="button"
          class="workbench-preview__rail-key"
          :class="{ 'is-active': !paletteOpen }"
          aria-label="Show document blocks"
          :aria-pressed="!paletteOpen"
          @click="paletteOpen = false"
        >
          <UIcon
            name="i-lucide-blocks"
            class="size-4"
          />
        </button>
        <button
          type="button"
          class="workbench-preview__rail-key"
          :class="{ 'is-active': paletteOpen }"
          aria-label="Browse available blocks"
          :aria-pressed="paletteOpen"
          @click="paletteOpen = !paletteOpen"
        >
          <UIcon
            name="i-lucide-search"
            class="size-4"
          />
        </button>
        <button
          type="button"
          class="workbench-preview__rail-key"
          :aria-label="`Switch preview to ${previewTheme === 'dark' ? 'light' : 'dark'} mode`"
          @click="previewTheme = previewTheme === 'dark' ? 'light' : 'dark'"
        >
          <UIcon
            :name="previewTheme === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'"
            class="size-4"
          />
        </button>
      </aside>

      <div class="workbench-preview__document">
        <div class="mb-4 flex items-center justify-between">
          <span class="text-xs font-semibold">Document</span>
          <span class="font-mono text-[10px] text-dimmed">{{ String(demoBlocks.length).padStart(2, '0') }} / 17</span>
        </div>

        <VueDraggable
          v-model="demoBlocks"
          handle=".demo-drag-handle"
          :animation="180"
          ghost-class="demo-block--dragging"
          class="space-y-1"
        >
          <div
            v-for="(block, index) in demoBlocks"
            :key="block.id"
            class="demo-block"
            :class="{ 'demo-block--active': block.id === activeId }"
          >
            <button
              type="button"
              class="demo-drag-handle cursor-grab text-dimmed active:cursor-grabbing"
              :aria-label="`Drag ${block.label} to reorder`"
            >
              <UIcon
                name="i-lucide-grip-vertical"
                class="size-3.5"
              />
            </button>
            <button
              type="button"
              class="flex min-w-0 flex-1 items-center gap-2 text-left"
              @click="selectBlock(block.id)"
            >
              <span class="font-mono text-[9px] text-dimmed">0{{ index + 1 }}</span>
              <UIcon
                :name="block.icon"
                class="size-3.5 text-primary"
              />
              <span class="truncate">{{ block.label }}</span>
            </button>
            <button
              v-if="block.id === activeId"
              type="button"
              class="demo-remove"
              :aria-label="`Remove ${block.label}`"
              @click="removeBlock(block.id)"
            >
              <UIcon
                name="i-lucide-x"
                class="size-3.5"
              />
            </button>
          </div>
        </VueDraggable>

        <div
          v-if="activeBlock"
          class="demo-inspector"
        >
          <div class="mb-2 flex items-center justify-between">
            <span class="font-mono text-[9px] uppercase tracking-[0.12em] text-dimmed">Edit {{ activeBlock.label }}</span>
            <span class="size-1.5 bg-primary" />
          </div>

          <template v-if="activeBlock.id === 'header'">
            <label class="demo-field">
              <span>Name</span>
              <input
                v-model="profile.name"
                maxlength="28"
              >
            </label>
            <label class="demo-field">
              <span>Tagline</span>
              <input
                v-model="profile.tagline"
                maxlength="52"
              >
            </label>
          </template>

          <label
            v-else-if="activeBlock.id === 'typing'"
            class="demo-field"
          >
            <span>Line</span>
            <input
              v-model="profile.typing"
              maxlength="48"
            >
          </label>

          <label
            v-else-if="activeBlock.id === 'about'"
            class="demo-field"
          >
            <span>Introduction</span>
            <textarea
              v-model="profile.about"
              rows="3"
              maxlength="180"
            />
          </label>

          <label
            v-else-if="activeBlock.id === 'tech'"
            class="demo-field"
          >
            <span>Tools, separated by commas</span>
            <input
              v-model="toolsInput"
              maxlength="80"
            >
          </label>

          <p
            v-else
            class="text-[11px] leading-5 text-muted"
          >
            This block is preview-ready. Drag it to change the document order.
          </p>
        </div>

        <button
          type="button"
          class="demo-add"
          :aria-expanded="paletteOpen"
          @click="paletteOpen = !paletteOpen"
        >
          <UIcon
            name="i-lucide-plus"
            class="size-3.5"
          />
          Add block
        </button>

        <div
          v-if="paletteOpen"
          class="demo-palette"
        >
          <button
            v-for="block in availableBlocks"
            :key="block.id"
            type="button"
            @click="addBlock(block)"
          >
            <UIcon
              :name="block.icon"
              class="size-3.5"
            />
            {{ block.label }}
          </button>
          <p v-if="!availableBlocks.length">
            Every demo block is in the document.
          </p>
        </div>
      </div>

      <div
        ref="previewCanvas"
        class="workbench-preview__canvas"
        :class="{ 'is-light': previewTheme === 'light' }"
      >
        <div class="demo-profile">
          <template
            v-for="block in demoBlocks"
            :key="block.id"
          >
            <button
              v-if="block.id === 'header'"
              type="button"
              class="demo-preview-section demo-preview-header"
              :data-demo-block="block.id"
              :class="{ 'is-focused': activeId === block.id }"
              @click="selectBlock(block.id)"
            >
              <span class="demo-kicker">github.com/rithybondeth</span>
              <strong>{{ profile.name || 'Your Name' }}</strong>
              <span class="demo-muted">{{ profile.tagline || 'Your tagline' }}</span>
            </button>

            <button
              v-else-if="block.id === 'typing'"
              type="button"
              class="demo-preview-section demo-preview-typing"
              :data-demo-block="block.id"
              :class="{ 'is-focused': activeId === block.id }"
              @click="selectBlock(block.id)"
            >
              <span>{{ profile.typing || 'Start typing…' }}</span><i aria-hidden="true" />
            </button>

            <button
              v-else-if="block.id === 'about'"
              type="button"
              class="demo-preview-section"
              :data-demo-block="block.id"
              :class="{ 'is-focused': activeId === block.id }"
              @click="selectBlock(block.id)"
            >
              <strong>About me</strong>
              <span class="demo-muted">{{ profile.about || 'Write a short introduction.' }}</span>
            </button>

            <button
              v-else-if="block.id === 'tech'"
              type="button"
              class="demo-preview-section"
              :data-demo-block="block.id"
              :class="{ 'is-focused': activeId === block.id }"
              @click="selectBlock(block.id)"
            >
              <strong>Current stack</strong>
              <span class="demo-tool-list">
                <span
                  v-for="tool in profile.tools"
                  :key="tool"
                >{{ tool }}</span>
              </span>
            </button>

            <button
              v-else-if="block.id === 'stats'"
              type="button"
              class="demo-preview-section"
              :data-demo-block="block.id"
              :class="{ 'is-focused': activeId === block.id }"
              @click="selectBlock(block.id)"
            >
              <strong>GitHub stats</strong>
              <span class="demo-stat-grid">
                <span><b>1.2k</b><small>Contributions</small></span>
                <span><b>24</b><small>Repositories</small></span>
                <span><b>128</b><small>Stars</small></span>
              </span>
            </button>

            <button
              v-else-if="block.id === 'projects'"
              type="button"
              class="demo-preview-section"
              :data-demo-block="block.id"
              :class="{ 'is-focused': activeId === block.id }"
              @click="selectBlock(block.id)"
            >
              <strong>Featured projects</strong>
              <span class="demo-projects">
                <span>reahu-generator <small>Nuxt</small></span>
                <span>open-workbench <small>TypeScript</small></span>
              </span>
            </button>

            <button
              v-else
              type="button"
              class="demo-preview-section"
              :data-demo-block="block.id"
              :class="{ 'is-focused': activeId === block.id }"
              @click="selectBlock(block.id)"
            >
              <strong>Find me online</strong>
              <span class="demo-socials">
                <span>GitHub</span>
                <span>LinkedIn</span>
                <span>Website</span>
              </span>
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
