import { compressToEncodedURIComponent } from 'lz-string'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { BLOCK_ORDER, createBlock, starterBlocks } from '~/core/blocks'
import { decodeBlocks } from '~/core/document/share'
import { loadStoredBlocks, persistBlocks } from '~/core/document/storage'
import { parseBlocks } from '~/core/document/validation'
import { renderReadme } from '~/core/render'

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('document validation', () => {
  it('accepts and clones a valid document', () => {
    const blocks = starterBlocks()
    const parsed = parseBlocks(blocks)

    expect(parsed).toEqual(blocks)
    expect(parsed).not.toBe(blocks)
  })

  it('fills properties added in newer document versions and drops unknown ones', () => {
    const [header] = clone(starterBlocks())
    const props = header!.props as unknown as Record<string, unknown>

    delete props.tagline
    props.unexpected = 'discard me'

    const parsed = parseBlocks([header!])
    const parsedProps = parsed?.[0]?.props as unknown as Record<string, unknown>

    expect(parsedProps.tagline).toBe('Full-stack developer')
    expect(parsedProps).not.toHaveProperty('unexpected')
  })

  it.each([
    [{ id: 'bad', type: 'unknown', props: {} }],
    [{ id: 'bad', type: 'header', props: { name: 42 } }],
    [{ id: 'same', type: 'header', props: {} }, { id: 'same', type: 'about', props: {} }]
  ])('rejects an invalid document', (value) => {
    expect(parseBlocks(value)).toBeNull()
  })

  it('keeps every default block renderer safe', () => {
    for (const type of BLOCK_ORDER) {
      expect(() => renderReadme([createBlock(type)])).not.toThrow()
    }
  })
})

describe('shared documents', () => {
  it('decodes a valid compressed document', () => {
    const blocks = starterBlocks()
    const payload = compressToEncodedURIComponent(JSON.stringify(blocks))

    expect(decodeBlocks(payload)).toEqual(blocks)
  })

  it('rejects malformed and oversized payloads', () => {
    const malformed = compressToEncodedURIComponent(JSON.stringify([{ type: 'header' }]))

    expect(decodeBlocks(malformed)).toBeNull()
    expect(decodeBlocks('x'.repeat(100_001))).toBeNull()
  })
})

describe('local persistence', () => {
  it('round-trips a valid document', () => {
    const values = new Map<string, string>()
    vi.stubGlobal('window', {
      localStorage: {
        getItem: (key: string) => values.get(key) ?? null,
        setItem: (key: string, value: string) => values.set(key, value)
      }
    })

    const blocks = starterBlocks()

    expect(persistBlocks(blocks)).toBe(true)
    expect(loadStoredBlocks()).toEqual(blocks)
  })

  it('fails safely when browser storage is unavailable', () => {
    vi.stubGlobal('window', {
      localStorage: {
        getItem: () => {
          throw new Error('blocked')
        },
        setItem: () => {
          throw new Error('blocked')
        }
      }
    })

    expect(loadStoredBlocks()).toBeNull()
    expect(persistBlocks(starterBlocks())).toBe(false)
  })
})
