import type { Alignment } from './common'
import type { BadgeItem, BadgeStyle, SocialLink, SupportLink } from './social'
import type { ActivityTheme, LangLayout, StatsTheme, TrophyTheme, TrophyTitle } from './stats'
import type {
  BannerAnimation,
  BannerShape,
  ColorMode,
  ColumnAlign,
  DividerStyle,
  IconProvider,
  TypingFont
} from './widgets'

/**
 * The block model.
 *
 * A README is an ordered list of typed blocks. Every block knows how to render
 * itself to Markdown (see `~/core/render`), so the document is always a pure
 * function of this array — never a string edited in two places at once.
 *
 * `BlockPropsMap` is the single source of truth: the union, the renderer
 * registry, the metadata registry, and the editor map are all derived from it,
 * so adding a key here makes TypeScript demand each of the four in turn.
 *
 * Every prop must stay JSON-serializable — persistence, share links, and
 * `cloneBlock` all round-trip through JSON.
 */
export interface BlockPropsMap {
  header: {
    name: string
    tagline: string
    align: Alignment
    /** Optional banner image shown above the name. */
    bannerUrl: string
    username: string
    /** Adds a visitor-count badge under the tagline. */
    showVisitorBadge: boolean
    /** Adds a live follower-count badge. */
    showFollowers: boolean
    /** Adds a live total-stars badge. */
    showStars: boolean
    badgeStyle: BadgeStyle
    /** Hex without the leading `#`, used for every badge in this block. */
    badgeColor: string
  }
  about: {
    heading: string
    intro: string
    /** Rendered as a bullet list. Empty strings are dropped at render time. */
    bullets: string[]
    /** Optional pull quote under the intro. */
    quote: string
    align: Alignment
  }
  techStack: {
    heading: string
    /** skillicons.dev slugs, e.g. `ts`, `vue`, `docker`. */
    icons: string[]
    perLine: number
    theme: 'dark' | 'light'
    align: Alignment
    /** Icon sprites, or one shields.io badge per entry. */
    provider: IconProvider
    /** Only read when `provider` is `badges`. */
    badgeStyle: BadgeStyle
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
    /** Which chart the top-languages card draws. */
    langLayout: LangLayout
    langsCount: number
    showIcons: boolean
    hideBorder: boolean
    hideRank: boolean
    includeAllCommits: boolean
    borderRadius: number
  }
  activity: {
    heading: string
    username: string
    theme: ActivityTheme
    /** Days of history to plot. */
    days: number
    height: number
    /** Fills the area under the line. */
    area: boolean
    /** Corner radius of the graph frame. */
    radius: number
    hideBorder: boolean
    hideTitle: boolean
    customTitle: string
    align: Alignment
  }
  trophies: {
    heading: string
    username: string
    theme: TrophyTheme
    /** Empty means every category. */
    titles: TrophyTitle[]
    column: number
    row: number
    marginW: number
    marginH: number
    noFrame: boolean
    noBackground: boolean
    align: Alignment
  }
  repos: {
    heading: string
    username: string
    /** Repository names, owned by `username` unless written as `owner/repo`. */
    repos: string[]
    theme: StatsTheme
    perRow: number
    showOwner: boolean
    hideBorder: boolean
    borderRadius: number
    align: Alignment
  }
  banner: {
    shape: BannerShape
    text: string
    subtext: string
    colorMode: ColorMode
    /** Hex without `#`. Start of the gradient, or the solid fill. */
    colorFrom: string
    colorTo: string
    height: number
    fontSize: number
    fontColor: string
    /** Horizontal text position as a percentage of the banner width. */
    fontAlign: number
    fontAlignY: number
    animation: BannerAnimation
    /** Flips the shape — use `footer` at the bottom of a README. */
    section: 'header' | 'footer'
    reversal: boolean
  }
  typing: {
    /** One line per entry. Typed out in order, then repeated. */
    lines: string[]
    font: TypingFont
    size: number
    weight: number
    /** Hex without `#`. */
    color: string
    /** Milliseconds each line stays on screen. */
    duration: number
    /** Milliseconds held before the next line starts. */
    pause: number
    width: number
    height: number
    center: boolean
    vCenter: boolean
    /** Keeps finished lines on screen instead of clearing between them. */
    multiline: boolean
    repeat: boolean
    align: Alignment
  }
  snake: {
    /** The user whose contribution grid gets eaten. */
    username: string
    /** Branch the generator action pushes its SVG to. */
    branch: string
    /** Serves a separate dark-mode SVG through `<picture>`. */
    darkVariant: boolean
    align: Alignment
  }
  badges: {
    heading: string
    items: BadgeItem[]
    style: BadgeStyle
    align: Alignment
  }
  support: {
    heading: string
    text: string
    links: SupportLink[]
    style: BadgeStyle
    align: Alignment
  }
  quote: {
    layout: 'horizontal' | 'vertical'
    theme: StatsTheme
    border: boolean
    /** Grows the quote in rather than cutting to it. */
    animate: boolean
    align: Alignment
  }
  table: {
    heading: string
    columns: string[]
    /** Row-major. Ragged rows are padded at render time. */
    rows: string[][]
    columnAlign: ColumnAlign
  }
  divider: {
    style: DividerStyle
    height: number
    colorMode: ColorMode
    colorFrom: string
    colorTo: string
  }
  socials: {
    heading: string
    links: SocialLink[]
    align: Alignment
    style: BadgeStyle
    /** Logo-only badges when off. */
    showLabels: boolean
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
