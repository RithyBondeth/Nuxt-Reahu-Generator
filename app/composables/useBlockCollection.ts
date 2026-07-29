import { cloneBlock, createBlock, starterBlocks } from '~/core/blocks'
import type { Block, BlockType } from '~/types'

/**
 * The block array and every operation that mutates it, plus undo/redo.
 *
 * Deliberately knows nothing about persistence, sharing, or rendering — those
 * compose on top in `useReadme`.
 */
export function useBlockCollection() {
  const blocks = ref<Block[]>(starterBlocks())

  // `deep` is required: editors mutate `block.props` in place rather than
  // replacing whole blocks, and a shallow watcher would miss every edit.
  const { undo, redo, canUndo, canRedo, clear: clearHistory } = useRefHistory(blocks, {
    deep: true,
    capacity: 100
  })

  function add(type: BlockType) {
    const block = createBlock(type)
    blocks.value.push(block)
    return block
  }

  function remove(id: string) {
    blocks.value = blocks.value.filter(block => block.id !== id)
  }

  function duplicate(id: string) {
    const index = blocks.value.findIndex(block => block.id === id)
    if (index === -1) return

    blocks.value.splice(index + 1, 0, cloneBlock(blocks.value[index]!))
  }

  function move(id: string, direction: -1 | 1) {
    const from = blocks.value.findIndex(block => block.id === id)
    const to = from + direction
    if (from === -1 || to < 0 || to >= blocks.value.length) return

    const [block] = blocks.value.splice(from, 1)
    blocks.value.splice(to, 0, block!)
  }

  function reset() {
    blocks.value = starterBlocks()
  }

  return {
    blocks,
    add,
    remove,
    duplicate,
    move,
    reset,
    undo,
    redo,
    canUndo,
    canRedo,
    clearHistory
  }
}
