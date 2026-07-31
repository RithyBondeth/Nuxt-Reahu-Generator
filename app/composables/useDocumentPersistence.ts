import type { Ref } from 'vue'
import { decodeBlocks, loadStoredBlocks, persistBlocks, readSharePayload } from '~/core/document'
import type { Block } from '~/types'

/**
 * Hydrates the document on boot and saves it as it changes.
 *
 * Client-only by construction — it touches `window` directly. That is safe
 * because `/build` runs with `ssr: false` (see `nuxt.config.ts`); rendering it
 * on the server would hydrate against state the server cannot see.
 */
export function useDocumentPersistence(
  blocks: Ref<Block[]>,
  onHydrated: () => void,
  onPersistenceStatus?: (available: boolean) => void,
  onInvalidShare?: () => void
) {
  // A shared link wins over local storage, so opening someone else's link shows
  // their README rather than silently resurrecting your own draft.
  function hydrate() {
    const payload = readSharePayload(window.location.hash)
    const shared = payload ? decodeBlocks(payload) : null

    if (payload) {
      if (shared) blocks.value = shared
      else onInvalidShare?.()
    } else {
      const stored = loadStoredBlocks()
      if (stored) blocks.value = stored
    }

    // Hydration is not an edit — undo should never walk back past it.
    onHydrated()
  }

  hydrate()

  watchDebounced(
    blocks,
    (value) => {
      const available = persistBlocks(value)
      onPersistenceStatus?.(available)
    },
    { deep: true, debounce: 400 }
  )
}
