import type { Block, BlockOf, BlockType } from '~/types'
import { BLOCK_DEFINITIONS } from './definitions'

const newId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `b_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`

export function createBlock<K extends BlockType>(type: K): BlockOf<K> {
  // The literal below is structurally exactly `BlockOf<K>`, but TypeScript will
  // not distribute `Extract` over an unresolved type parameter, so it cannot
  // verify that. The double assertion is the narrowest way to say so.
  return { id: newId(), type, props: BLOCK_DEFINITIONS[type].create() } as unknown as BlockOf<K>
}

/**
 * Duplicating must mint a new id and deep-copy props, or the two cards would
 * share nested arrays and edit each other.
 *
 * A JSON round-trip rather than `structuredClone`: callers pass Vue reactive
 * proxies, which `structuredClone` refuses to clone. Block props are already
 * required to be JSON-serializable — persistence and share links both depend on
 * it — so this loses nothing, and it keeps this layer free of Vue imports.
 */
export function cloneBlock(block: Block): Block {
  return { ...block, id: newId(), props: JSON.parse(JSON.stringify(block.props)) } as Block
}
