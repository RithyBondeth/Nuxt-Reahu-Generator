<script setup lang="ts">
import { ALIGNMENT_OPTIONS } from '~/config/ui-options'
import type { BlockOf } from '~/types'

const props = defineProps<{ block: BlockOf<'about'> }>()
const model = computed(() => props.block.props)

/**
 * Picking an emoji fills the first blank bullet, or starts a new one when they
 * are all written. Prepending to whichever line happens to be focused would be
 * fussier to predict than it is useful — a bullet almost always opens with its
 * emoji, so "give me a line that starts with this" is the actual intent.
 */
function insertEmoji(emoji: string) {
  const blank = model.value.bullets.findIndex(bullet => !bullet.trim())

  if (blank === -1) model.value.bullets.push(`${emoji} `)
  else model.value.bullets[blank] = `${emoji} `
}
</script>

<template>
  <div class="space-y-3">
    <UFormField
      label="Heading"
      size="sm"
    >
      <UInput
        v-model="model.heading"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Intro"
      size="sm"
    >
      <UTextarea
        v-model="model.intro"
        :rows="3"
        autoresize
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Bullet points"
      size="sm"
    >
      <template #hint>
        <EmojiPicker @pick="insertEmoji" />
      </template>

      <StringListField
        v-model="model.bullets"
        placeholder="🔭 Currently working on …"
        add-label="Add bullet"
      />
    </UFormField>

    <UFormField
      label="Pull quote"
      size="sm"
      hint="optional"
    >
      <UTextarea
        v-model="model.quote"
        :rows="2"
        autoresize
        placeholder="Something you believe about building software."
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Alignment"
      size="sm"
    >
      <SegmentedField
        v-model="model.align"
        :items="ALIGNMENT_OPTIONS"
      />
    </UFormField>
  </div>
</template>
