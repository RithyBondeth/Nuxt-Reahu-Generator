<script setup lang="ts">
import { ALIGNMENT_OPTIONS } from '~/config/ui-options'
import type { BlockOf } from '~/types'

const props = defineProps<{ block: BlockOf<'snake'> }>()
const model = computed(() => props.block.props)

const toast = useToast()
const { copy } = useClipboard()

/**
 * Held as a string in script rather than written into the template: the
 * workflow is full of `${{ … }}`, which Vue would try to interpolate.
 *
 * The branch name has to match `model.branch` — the action publishes to it and
 * the block reads from it, and nothing checks that the two agree.
 */
const workflow = computed(() => `name: Generate snake

on:
  schedule:
    - cron: "0 */12 * * *"
  workflow_dispatch:
  push:
    branches: [main]

jobs:
  generate:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: Platane/snk@v3
        id: snake
        with:
          github_user_name: \${{ github.repository_owner }}
          outputs: |
            dist/github-snake.svg
            dist/github-snake-dark.svg?palette=github-dark

      - uses: crazy-max/ghaction-github-pages@v4
        with:
          target_branch: ${model.value.branch.trim() || 'output'}
          build_dir: dist
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`)

async function copyWorkflow() {
  await copy(workflow.value)
  toast.add({
    title: 'Workflow copied',
    description: 'Save it as .github/workflows/snake.yml in your profile repo.',
    icon: 'i-lucide-check',
    color: 'success'
  })
}
</script>

<template>
  <div class="space-y-3">
    <div class="rounded-md border border-warning/40 bg-warning/5 p-2.5">
      <p class="flex items-start gap-1.5 text-xs text-warning">
        <UIcon
          name="i-lucide-triangle-alert"
          class="mt-0.5 size-3.5 shrink-0"
        />
        <span>
          This one needs setup. Unlike the other blocks it is not a live
          service — a GitHub Action in your profile repo draws the SVG and
          commits it. Until that has run once, the image is a broken link.
        </span>
      </p>
    </div>

    <UFormField
      label="GitHub username"
      size="sm"
      hint="required"
    >
      <UInput
        v-model="model.username"
        placeholder="octocat"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Output branch"
      size="sm"
      hint="where the action commits"
    >
      <UInput
        v-model="model.branch"
        placeholder="output"
        class="w-full font-mono"
      />
    </UFormField>

    <ToggleRow
      v-model="model.darkVariant"
      label="Separate dark version"
      hint="Serves a second SVG via <picture>"
    />

    <UFormField
      label="Align"
      size="sm"
    >
      <SegmentedField
        v-model="model.align"
        :items="ALIGNMENT_OPTIONS"
      />
    </UFormField>

    <UFormField
      label="Workflow file"
      size="sm"
      hint=".github/workflows/snake.yml"
    >
      <div class="space-y-1.5">
        <pre class="max-h-48 overflow-auto rounded-md border border-default bg-elevated/40 p-2 font-mono text-[11px] leading-relaxed"><code>{{ workflow }}</code></pre>

        <UButton
          icon="i-lucide-clipboard"
          label="Copy workflow"
          color="neutral"
          variant="soft"
          size="xs"
          @click="copyWorkflow"
        />
      </div>
    </UFormField>

    <p
      v-if="!model.username.trim()"
      class="text-xs text-warning"
    >
      Add a username — this section is left out of the README until you do.
    </p>
  </div>
</template>
