<script setup lang="ts">
import { COLUMN_ALIGN_OPTIONS } from '~/config/ui-options'
import type { BlockOf } from '~/types'

const props = defineProps<{ block: BlockOf<'table'> }>()
const model = computed(() => props.block.props)

const MAX_COLUMNS = 6

/**
 * Rows are kept rectangular here rather than at render time. The renderer pads
 * ragged rows so a half-built table still shows something, but letting them go
 * ragged in the editor means the inputs stop lining up with their headers.
 */
function addColumn() {
  if (model.value.columns.length >= MAX_COLUMNS) return

  model.value.columns.push('')
  model.value.rows.forEach(row => row.push(''))
}

function removeColumn(index: number) {
  model.value.columns.splice(index, 1)
  model.value.rows.forEach(row => row.splice(index, 1))
}

const addRow = () => model.value.rows.push(model.value.columns.map(() => ''))
const removeRow = (index: number) => model.value.rows.splice(index, 1)
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
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Columns"
      size="sm"
    >
      <div class="space-y-2">
        <div
          v-for="(_, index) in model.columns"
          :key="index"
          class="flex items-center gap-1.5"
        >
          <UInput
            v-model="model.columns[index]"
            size="sm"
            class="flex-1"
            placeholder="Column name"
          />
          <UButton
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            size="xs"
            :disabled="model.columns.length <= 1"
            aria-label="Remove column"
            @click="removeColumn(index)"
          />
        </div>

        <UButton
          icon="i-lucide-plus"
          label="Add column"
          color="neutral"
          variant="soft"
          size="xs"
          :disabled="model.columns.length >= MAX_COLUMNS"
          @click="addColumn"
        />
      </div>
    </UFormField>

    <UFormField
      :label="`Rows (${model.rows.length})`"
      size="sm"
    >
      <div class="space-y-2">
        <TransitionGroup name="row">
          <div
            v-for="(row, rowIndex) in model.rows"
            :key="rowIndex"
            class="flex items-start gap-1.5"
          >
            <div class="grid flex-1 gap-1">
              <UInput
                v-for="(_, cellIndex) in model.columns"
                :key="cellIndex"
                v-model="row[cellIndex]"
                size="sm"
                :placeholder="model.columns[cellIndex] || `Column ${cellIndex + 1}`"
                class="w-full"
              />
            </div>

            <UButton
              icon="i-lucide-x"
              color="neutral"
              variant="ghost"
              size="xs"
              aria-label="Remove row"
              @click="removeRow(rowIndex)"
            />
          </div>
        </TransitionGroup>

        <UButton
          icon="i-lucide-plus"
          label="Add row"
          color="neutral"
          variant="soft"
          size="xs"
          @click="addRow"
        />
      </div>
    </UFormField>

    <UFormField
      label="Column alignment"
      size="sm"
    >
      <SegmentedField
        v-model="model.columnAlign"
        :items="COLUMN_ALIGN_OPTIONS"
      />
    </UFormField>
  </div>
</template>
