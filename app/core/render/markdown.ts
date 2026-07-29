import type { BlockRenderer } from '~/types'

/** The escape hatch: whatever the user wrote, verbatim. */
export const renderMarkdown: BlockRenderer<'markdown'> = ({ source }) => source
