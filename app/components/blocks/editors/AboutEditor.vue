<script setup lang="ts">
import type { BlockOf } from '~/types'

const props = defineProps<{ block: BlockOf<'about'> }>()
const model = computed(() => props.block.props)

const addBullet = () => model.value.bullets.push('')
const removeBullet = (index: number) => model.value.bullets.splice(index, 1)
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
      <div class="space-y-2">
        <div
          v-for="(_, index) in model.bullets"
          :key="index"
          class="flex items-center gap-2"
        >
          <UInput
            v-model="model.bullets[index]"
            class="flex-1"
            placeholder="🔭 Currently working on …"
          />
          <UButton
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            size="xs"
            aria-label="Remove bullet"
            @click="removeBullet(index)"
          />
        </div>

        <UButton
          icon="i-lucide-plus"
          label="Add bullet"
          color="neutral"
          variant="soft"
          size="xs"
          @click="addBullet"
        />
      </div>
    </UFormField>
  </div>
</template>
