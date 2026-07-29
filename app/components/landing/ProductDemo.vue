<script setup lang="ts">
// A compact, static mirror of the real two-pane builder.
const demoBlocks = [
  ['Header', 'i-lucide-heading-1'],
  ['Typing text', 'i-lucide-type'],
  ['About me', 'i-lucide-user'],
  ['Tech stack', 'i-lucide-layers'],
  ['GitHub stats', 'i-lucide-bar-chart-3']
]

const demoTools = ['TypeScript', 'Nuxt', 'Python', 'Postgres', 'Flutter']
</script>

<template>
  <div class="workbench-preview enter-bloom d-6">
    <div class="workbench-preview__bar">
      <div class="flex items-center gap-2">
        <span class="grid size-5 place-items-center bg-primary text-[10px] font-bold text-[#111111]">R</span>
        <span class="text-xs font-medium">profile.readme</span>
      </div>
      <span class="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-muted">
        <span class="status-dot" />
        Live preview
      </span>
    </div>

    <div class="workbench-preview__body">
      <aside
        class="workbench-preview__rail"
        aria-hidden="true"
      >
        <span class="workbench-preview__rail-key is-active"><UIcon
          name="i-lucide-blocks"
          class="size-4"
        /></span>
        <span class="workbench-preview__rail-key"><UIcon
          name="i-lucide-search"
          class="size-4"
        /></span>
        <span class="workbench-preview__rail-key"><UIcon
          name="i-lucide-settings-2"
          class="size-4"
        /></span>
      </aside>

      <div class="workbench-preview__document">
        <div class="mb-4 flex items-center justify-between">
          <span class="text-xs font-semibold">Document</span>
          <span class="font-mono text-[10px] text-dimmed">05 / 17</span>
        </div>

        <div class="space-y-1">
          <div
            v-for="(block, index) in demoBlocks"
            :key="block[0]"
            class="demo-block"
            :class="{ 'demo-block--active': index === 2 }"
          >
            <span class="font-mono text-[9px] text-dimmed">0{{ index + 1 }}</span>
            <UIcon
              :name="block[1]"
              class="size-3.5 text-primary"
            />
            <span>{{ block[0] }}</span>
            <UIcon
              name="i-lucide-grip-vertical"
              class="ms-auto size-3.5 text-dimmed"
            />
          </div>
        </div>

        <button
          type="button"
          class="demo-add"
        >
          <UIcon
            name="i-lucide-plus"
            class="size-3.5"
          />
          Add block
        </button>
      </div>

      <div class="workbench-preview__canvas">
        <div class="mx-auto max-w-xl text-[#e6edf3]">
          <div class="text-center">
            <p class="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9198a1]">
              github.com/rithybondeth
            </p>
            <h2 class="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
              Rithy Bondeth
            </h2>
            <p class="mt-2 text-xs text-[#9198a1] sm:text-sm">
              Full-stack developer · Phnom Penh
            </p>
          </div>

          <div class="my-6 h-px bg-[#30363d]" />

          <h3 class="text-sm font-semibold">
            About me
          </h3>
          <p class="mt-2 text-xs leading-5 text-[#9198a1] sm:text-sm sm:leading-6">
            I build thoughtful web products and practical AI systems that turn complex work into clear experiences.
          </p>

          <h3 class="mt-6 text-sm font-semibold">
            Current stack
          </h3>
          <div class="mt-3 flex flex-wrap gap-2">
            <span
              v-for="tool in demoTools"
              :key="tool"
              class="border border-[#30363d] bg-[#161b22] px-2 py-1 font-mono text-[10px] text-[#c9d1d9]"
            >
              {{ tool }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
