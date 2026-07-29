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
  <div class="product-frame enter-bloom d-6">
    <div class="product-frame__bar">
      <div
        class="flex items-center gap-1.5"
        aria-hidden="true"
      >
        <span class="size-2 rounded-full bg-default/20" />
        <span class="size-2 rounded-full bg-default/20" />
        <span class="size-2 rounded-full bg-default/20" />
      </div>
      <span class="font-mono text-[10px] uppercase tracking-[0.14em] text-dimmed">reahu / draft</span>
      <span class="flex items-center gap-1.5 text-[11px] text-muted">
        <span class="status-dot" />
        Saved
      </span>
    </div>

    <div class="grid lg:grid-cols-[0.72fr_1.28fr]">
      <div class="border-b border-default p-3 sm:p-5 lg:border-b-0 lg:border-r">
        <div class="mb-3 flex items-center justify-between px-1">
          <span class="font-mono text-[10px] uppercase tracking-[0.14em] text-dimmed">Document</span>
          <span class="text-[11px] text-dimmed">6 blocks</span>
        </div>

        <div class="space-y-1.5">
          <div
            v-for="(block, index) in demoBlocks"
            :key="block[0]"
            class="demo-block"
            :class="{ 'demo-block--active': index === 2 }"
          >
            <UIcon
              name="i-lucide-grip-vertical"
              class="size-3.5 text-dimmed"
            />
            <UIcon
              :name="block[1]"
              class="size-3.5 text-primary"
            />
            <span>{{ block[0] }}</span>
            <UIcon
              name="i-lucide-chevron-right"
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

      <div class="bg-[#0d1117] p-5 sm:p-8">
        <div class="mx-auto max-w-xl text-[#e6edf3]">
          <div class="text-center">
            <p class="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9198a1]">
              github.com/rithybondeth
            </p>
            <h2 class="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
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
              class="rounded-md border border-[#30363d] bg-[#161b22] px-2 py-1 font-mono text-[10px] text-[#c9d1d9]"
            >
              {{ tool }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
