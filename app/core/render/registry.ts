import type { Block, BlockPropsMap, BlockType } from '~/types'
import { renderAbout } from './about'
import { renderActivity } from './activity'
import { renderBadges } from './badges'
import { renderBanner } from './banner'
import { renderDivider } from './divider'
import { renderHeader } from './header'
import { renderMarkdown } from './markdown'
import { renderQuote } from './quote'
import { renderRepos } from './repos'
import { renderSnake } from './snake'
import { renderSocials } from './socials'
import { renderStats } from './stats'
import { renderSupport } from './support'
import { renderTable } from './table'
import { renderTechStack } from './tech-stack'
import { renderTrophies } from './trophies'
import { renderTyping } from './typing'

/**
 * The render registry. One pure function per block type; the whole README is
 * `blocks.map(renderBlock).join()`.
 *
 * The mapped type means a new key in `BlockPropsMap` fails to compile until its
 * renderer is registered here.
 */
const RENDERERS: { [K in BlockType]: (props: BlockPropsMap[K]) => string } = {
  header: renderHeader,
  banner: renderBanner,
  typing: renderTyping,
  about: renderAbout,
  techStack: renderTechStack,
  stats: renderStats,
  activity: renderActivity,
  trophies: renderTrophies,
  repos: renderRepos,
  snake: renderSnake,
  badges: renderBadges,
  socials: renderSocials,
  support: renderSupport,
  quote: renderQuote,
  table: renderTable,
  divider: renderDivider,
  markdown: renderMarkdown
}

/** Renders a single block, narrowing props to the matching renderer. */
function renderBlock(block: Block): string {
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
