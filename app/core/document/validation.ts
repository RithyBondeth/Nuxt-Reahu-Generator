import { BLOCK_DEFINITIONS } from '../blocks/definitions'
import type { Block, BlockType } from '../../types'

const BLOCK_TYPES = new Set<BlockType>(Object.keys(BLOCK_DEFINITIONS) as BlockType[])
const MAX_BLOCKS = 100
const INVALID = Symbol('invalid-document-value')

/**
 * The only block properties whose defaults are empty arrays. Non-empty arrays
 * can infer their item shape from their defaults; these two need it stated.
 */
const EMPTY_ARRAY_ITEM_TYPES: Partial<Record<BlockType, Record<string, 'string'>>> = {
  trophies: { titles: 'string' },
  repos: { repos: 'string' }
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const cloneJson = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T

function normalizeValue(
  value: unknown,
  fallback: unknown,
  emptyArrayItemType?: 'string'
): unknown | typeof INVALID {
  if (value === undefined) return cloneJson(fallback)

  if (Array.isArray(fallback)) {
    if (!Array.isArray(value)) return INVALID

    if (!fallback.length) {
      return emptyArrayItemType && value.every(item => typeof item === emptyArrayItemType)
        ? [...value]
        : INVALID
    }

    const itemFallback = fallback[0]
    const normalized = value.map(item => normalizeValue(item, itemFallback))
    return normalized.includes(INVALID) ? INVALID : normalized
  }

  if (isRecord(fallback)) {
    if (!isRecord(value)) return INVALID

    const normalized: Record<string, unknown> = {}
    for (const [key, childFallback] of Object.entries(fallback)) {
      const child = normalizeValue(value[key], childFallback)
      if (child === INVALID) return INVALID
      normalized[key] = child
    }
    return normalized
  }

  if (typeof value !== typeof fallback) return INVALID
  if (typeof value === 'number' && !Number.isFinite(value)) return INVALID

  return value
}

function normalizeBlock(value: unknown): Block | null {
  if (!isRecord(value) || typeof value.id !== 'string' || !value.id.trim()) return null
  if (typeof value.type !== 'string' || !BLOCK_TYPES.has(value.type as BlockType)) return null
  if (!isRecord(value.props)) return null

  const type = value.type as BlockType
  const defaults = BLOCK_DEFINITIONS[type].create()
  const props: Record<string, unknown> = {}

  for (const [key, fallback] of Object.entries(defaults)) {
    const normalized = normalizeValue(
      value.props[key],
      fallback,
      EMPTY_ARRAY_ITEM_TYPES[type]?.[key]
    )
    if (normalized === INVALID) return null
    props[key] = normalized
  }

  return { id: value.id, type, props } as Block
}

/**
 * Converts untrusted JSON into the application's block model.
 *
 * Unknown properties are dropped, missing properties receive current defaults,
 * and structurally invalid or duplicate blocks reject the whole document. This
 * keeps old drafts forward-compatible without letting a malformed share link
 * reach a renderer with impossible values.
 */
export function parseBlocks(value: unknown): Block[] | null {
  if (!Array.isArray(value) || !value.length || value.length > MAX_BLOCKS) return null

  const blocks: Block[] = []
  const ids = new Set<string>()

  for (const candidate of value) {
    const block = normalizeBlock(candidate)
    if (!block || ids.has(block.id)) return null

    ids.add(block.id)
    blocks.push(block)
  }

  return blocks
}
