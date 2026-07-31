import type { Block } from '~/types'
import { parseBlocks } from './validation'

/**
 * Local persistence for the working document.
 *
 * The key is versioned: if `BlockPropsMap` ever changes shape incompatibly,
 * bump the suffix rather than writing a migration for a draft README.
 */
const STORAGE_KEY = 'ghreadme:blocks:v1'

export function loadStoredBlocks(): Block[] | null {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return null

    const parsed = JSON.parse(saved)
    return parseBlocks(parsed)
  } catch {
    // Corrupt payload or unavailable storage — the caller uses the starter.
    return null
  }
}

export function persistBlocks(blocks: Block[]): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks))
    return true
  } catch {
    return false
  }
}
