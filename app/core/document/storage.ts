import type { Block } from '~/types'

/**
 * Local persistence for the working document.
 *
 * The key is versioned: if `BlockPropsMap` ever changes shape incompatibly,
 * bump the suffix rather than writing a migration for a draft README.
 */
const STORAGE_KEY = 'ghreadme:blocks:v1'

export function loadStoredBlocks(): Block[] | null {
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (!saved) return null

  try {
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) && parsed.length ? parsed as Block[] : null
  } catch {
    // Corrupt payload — the caller falls back to the starter document.
    return null
  }
}

export function persistBlocks(blocks: Block[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks))
}

export function clearStoredBlocks(): void {
  window.localStorage.removeItem(STORAGE_KEY)
}
