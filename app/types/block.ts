import type { Alignment } from './common'
import type { BadgeStyle, SocialLink } from './social'
import type { StatsTheme } from './stats'

/**
 * The block model.
 *
 * A README is an ordered list of typed blocks. Every block knows how to render
 * itself to Markdown (see `~/core/render`), so the document is always a pure
 * function of this array — never a string edited in two places at once.
 *
 * `BlockPropsMap` is the single source of truth: the union, the renderer
 * registry, and the metadata registry are all derived from it, so adding a key
 * here makes TypeScript demand the matching renderer and editor.
 */
export interface BlockPropsMap {
  header: {
    name: string
    tagline: string
    align: Alignment
    /** Optional banner image shown above the name. */
    bannerUrl: string
    /** Adds a visitor-count badge under the tagline. */
    showVisitorBadge: boolean
    username: string
  }
  about: {
    heading: string
    intro: string
    /** Rendered as a bullet list. Empty strings are dropped at render time. */
    bullets: string[]
  }
  techStack: {
    heading: string
    /** skillicons.dev slugs, e.g. `ts`, `vue`, `docker`. */
    icons: string[]
    perLine: number
    theme: 'dark' | 'light'
    align: Alignment
  }
  stats: {
    heading: string
    username: string
    theme: StatsTheme
    showStats: boolean
    showStreak: boolean
    showTopLangs: boolean
    /** Puts the stat cards side by side instead of stacked. */
    sideBySide: boolean
  }
  socials: {
    heading: string
    links: SocialLink[]
    align: Alignment
    style: BadgeStyle
  }
  markdown: {
    source: string
  }
}

export type BlockType = keyof BlockPropsMap

/**
 * Discriminated union derived from the map above, so `block.type` narrows
 * `block.props` correctly at every call site.
 */
export type Block = {
  [K in BlockType]: { id: string, type: K, props: BlockPropsMap[K] }
}[BlockType]

export type BlockOf<K extends BlockType> = Extract<Block, { type: K }>

/** Signature every renderer in `~/core/render` implements. */
export type BlockRenderer<K extends BlockType> = (props: BlockPropsMap[K]) => string
