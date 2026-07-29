<script setup lang="ts">
import { BADGE_PRESETS, EMPTY_BADGE } from '~/config/badge-presets'
import { ALIGNMENT_OPTIONS, BADGE_STYLE_OPTIONS } from '~/config/ui-options'
import type { BadgeItem, BlockOf } from '~/types'

const props = defineProps<{ block: BlockOf<'badges'> }>()
const model = computed(() => props.block.props)

const expanded = ref<number | null>(0)

function add(item: BadgeItem = EMPTY_BADGE()) {
  // Structured-clone the preset: presets are module-level constants, and
  // pushing one directly would let two badges edit the same object.
  model.value.items.push({ ...item })
  expanded.value = model.value.items.length - 1
}

function remove(index: number) {
  model.value.items.splice(index, 1)
  if (expanded.value === index) expanded.value = null
}

const summary = (item: BadgeItem) =>
  [item.label.trim(), item.message.trim()].filter(Boolean).join(' · ') || 'Empty badge'
</script>

<template>
  <div class="space-y-3">
    <UFormField
      label="Heading"
      size="sm"
      hint="optional"
    >
      <UInput
        v-model="model.heading"
        placeholder="Leave blank for a bare row"
        class="w-full"
      />
    </UFormField>

    <div class="grid grid-cols-2 gap-2">
      <UFormField
        label="Style"
        size="sm"
      >
        <USelect
          v-model="model.style"
          :items="BADGE_STYLE_OPTIONS"
          class="w-full"
        />
      </UFormField>

      <UFormField
        label="Align"
        size="sm"
      >
        <SegmentedField
          v-model="model.align"
          :items="ALIGNMENT_OPTIONS"
          icon-only
        />
      </UFormField>
    </div>

    <div class="space-y-2">
      <TransitionGroup name="row">
        <div
          v-for="(item, index) in model.items"
          :key="index"
          class="rounded-md border border-default bg-default/40"
        >
          <div class="flex items-center gap-1">
            <button
              type="button"
              class="flex min-w-0 flex-1 items-center gap-2 px-2 py-1.5 text-left"
              @click="expanded = expanded === index ? null : index"
            >
              <span
                class="size-2.5 shrink-0 rounded-full"
                :style="{ background: `#${item.color.replace(/^#/, '')}` }"
              />
              <span class="truncate text-xs">{{ summary(item) }}</span>
            </button>

            <UButton
              icon="i-lucide-x"
              color="neutral"
              variant="ghost"
              size="xs"
              aria-label="Remove badge"
              @click="remove(index)"
            />
          </div>

          <div
            v-if="expanded === index"
            class="space-y-2 border-t border-default px-2 py-2"
          >
            <div class="grid grid-cols-2 gap-2">
              <UFormField
                label="Left text"
                size="sm"
                hint="optional"
              >
                <UInput
                  v-model="item.label"
                  size="sm"
                  placeholder="Status"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                label="Right text"
                size="sm"
              >
                <UInput
                  v-model="item.message"
                  size="sm"
                  placeholder="Open to work"
                  class="w-full"
                />
              </UFormField>
            </div>

            <ColorField
              v-model="item.color"
              label="Colour"
            />

            <UFormField
              label="Logo"
              size="sm"
              hint="simple-icons slug"
            >
              <UInput
                v-model="item.logo"
                size="sm"
                placeholder="github"
                class="w-full font-mono"
              />
            </UFormField>

            <UFormField
              label="Links to"
              size="sm"
              hint="optional"
            >
              <UInput
                v-model="item.href"
                size="sm"
                placeholder="https://…"
                class="w-full"
              />
            </UFormField>
          </div>
        </div>
      </TransitionGroup>

      <UButton
        icon="i-lucide-plus"
        label="Add badge"
        color="neutral"
        variant="soft"
        size="xs"
        @click="add()"
      />
    </div>

    <UFormField
      label="Start from a preset"
      size="sm"
    >
      <div class="space-y-1.5">
        <div
          v-for="preset in BADGE_PRESETS"
          :key="preset.group"
        >
          <p class="mb-1 text-xs text-dimmed">
            {{ preset.group }}
          </p>
          <div class="flex flex-wrap gap-1">
            <button
              v-for="item in preset.items"
              :key="item.message"
              type="button"
              class="chip"
              @click="add(item)"
            >
              {{ item.message }}
            </button>
          </div>
        </div>
      </div>
    </UFormField>

    <p class="text-xs text-dimmed">
      Logos come from
      <a
        href="https://simpleicons.org"
        target="_blank"
        class="underline"
      >simple-icons</a> — use the slug, not the brand name. An unknown slug just
      renders the badge without a logo.
    </p>
  </div>
</template>
