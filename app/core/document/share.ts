import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'
import type { Block } from '~/types'

/**
 * Share links.
 *
 * The document is compressed into the URL *fragment*, which browsers never send
 * to the server. That is what lets sharing work with no storage and no backend —
 * and it is also why `ReadmePreview` sanitizes: a link can carry a document
 * authored by someone other than the person viewing it.
 */
const SHARE_PARAM = 's'

export function encodeBlocks(blocks: Block[]): string {
  return compressToEncodedURIComponent(JSON.stringify(blocks))
}

export function decodeBlocks(payload: string): Block[] | null {
  try {
    const json = decompressFromEncodedURIComponent(payload)
    const parsed = json ? JSON.parse(json) : null
    return Array.isArray(parsed) && parsed.length ? parsed as Block[] : null
  } catch {
    return null
  }
}

/** Pulls the share payload out of a `#s=…` fragment, if present. */
export function readSharePayload(hash: string): string | null {
  return new URLSearchParams(hash.replace(/^#/, '')).get(SHARE_PARAM)
}

export function buildShareUrl(blocks: Block[]): string {
  const { origin, pathname } = window.location
  return `${origin}${pathname}#${SHARE_PARAM}=${encodeBlocks(blocks)}`
}
