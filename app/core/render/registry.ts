import type { Block, BlockPropsMap, BlockType } from '~/types'
import { renderAbout } from './about'
import { renderHeader } from './header'
import { renderMarkdown } from './markdown'
import { renderSocials } from './socials'
import { renderStats } from './stats'
import { renderTechStack } from './tech-stack'

/**
 * The render registry. One pure function per block type; the whole README is
 * `blocks.map(renderBlock).join()`.
 *
 * The mapped type means a new key in `BlockPropsMap` fails to compile until its
 * renderer is registered here.
 */
const RENDERERS: { [K in BlockType]: (props: BlockPropsMap[K]) => string } = {
  header: renderHeader,
  about: renderAbout,
  techStack: renderTechStack,
  stats: renderStats,
  socials: renderSocials,
  markdown: renderMarkdown
}

/** Renders a single block, narrowing props to the matching renderer. */
export function renderBlock(block: Block): string {
  const render = RENDERERS[block.type] as (props: Block['props']) => string
  return render(block.props).trim()
}

/** Renders the full document. Blocks that render empty are dropped entirely. */
export function renderReadme(blocks: Block[]): string {
  return blocks
    .map(renderBlock)
    .filter(Boolean)
    .join('\n\n')
    .concat('\n')
}
