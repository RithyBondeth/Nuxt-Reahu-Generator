import { buildShareUrl, downloadMarkdown } from '~/core/document'
import { renderReadme } from '~/core/render'

/**
 * Single source of truth for the builder.
 *
 * Shared across the page, block list, and preview via `createSharedComposable`,
 * so every consumer sees the same array without prop-drilling through the tree.
 *
 * This file is deliberately thin — it wires the pieces together and owns
 * nothing itself. State lives in `useBlockCollection`, persistence in
 * `useDocumentPersistence`, and rendering in `~/core/render`.
 */
export const useReadme = createSharedComposable(() => {
  const collection = useBlockCollection()
  const persistenceError = ref(false)
  const invalidShare = ref(false)

  if (import.meta.client) {
    useDocumentPersistence(
      collection.blocks,
      collection.clearHistory,
      available => persistenceError.value = !available,
      () => invalidShare.value = true
    )
  }

  const markdown = computed(() => renderReadme(collection.blocks.value))

  const shareUrl = () => buildShareUrl(collection.blocks.value)
  const download = (filename = 'README.md') => downloadMarkdown(filename, markdown.value)

  return {
    ...collection,
    invalidShare,
    markdown,
    persistenceError,
    shareUrl,
    download
  }
})
