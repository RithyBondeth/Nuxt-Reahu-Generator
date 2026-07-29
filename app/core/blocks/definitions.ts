import type { BlockPropsMap, BlockType } from '~/types'

/**
 * Block metadata: what the "Add block" menu shows, and the props a freshly
 * created block starts with.
 *
 * Defaults live here rather than in the editors so that a block looks the same
 * however it was created — added by hand, duplicated, or seeded by the starter
 * document. They are also the answer to "what does this block even do", so each
 * one is set to something that renders immediately rather than to empty values.
 */

export type BlockCategory = 'Structure' | 'Content' | 'Graphs' | 'Motion' | 'Links'

export interface BlockDefinition<K extends BlockType> {
  label: string
  icon: string
  description: string
  category: BlockCategory
  /** Extra search terms for the palette, beyond the label and description. */
  keywords?: string[]
  /** Flags a block whose output depends on something outside this app. */
  needsSetup?: boolean
  create: () => BlockPropsMap[K]
}

export const BLOCK_DEFINITIONS: { [K in BlockType]: BlockDefinition<K> } = {
  header: {
    label: 'Header',
    icon: 'i-lucide-heading-1',
    description: 'Name, tagline, and live counters',
    category: 'Structure',
    keywords: ['title', 'name', 'intro', 'banner', 'followers', 'stars'],
    create: () => ({
      name: 'Your Name',
      tagline: 'Full-stack developer',
      align: 'center',
      bannerUrl: '',
      username: '',
      showVisitorBadge: false,
      showFollowers: false,
      showStars: false,
      badgeStyle: 'for-the-badge',
      badgeColor: 'C5F74F'
    })
  },
  banner: {
    label: 'Banner',
    icon: 'i-lucide-panel-top',
    description: 'Full-width gradient crest with a title',
    category: 'Structure',
    keywords: ['capsule', 'wave', 'hero', 'cover', 'gradient', 'animated'],
    create: () => ({
      shape: 'waving',
      text: 'Your Name',
      subtext: '',
      colorMode: 'gradient',
      colorFrom: 'C5F74F',
      colorTo: '404040',
      height: 200,
      fontSize: 48,
      fontColor: 'FFFFFF',
      fontAlign: 50,
      fontAlignY: 38,
      animation: 'fadeIn',
      section: 'header',
      reversal: false
    })
  },
  typing: {
    label: 'Typing text',
    icon: 'i-lucide-type',
    description: 'Lines that type themselves out, on a loop',
    category: 'Motion',
    keywords: ['animation', 'animated', 'typewriter', 'svg', 'motion'],
    create: () => ({
      lines: ['Full-stack developer', 'Open-source contributor', 'Always shipping'],
      font: 'Fira Code',
      size: 26,
      weight: 600,
      color: 'A9D93B',
      duration: 3500,
      pause: 800,
      width: 500,
      height: 60,
      center: true,
      vCenter: true,
      multiline: false,
      repeat: true,
      align: 'center'
    })
  },
  about: {
    label: 'About me',
    icon: 'i-lucide-user',
    description: 'A short intro, bullets, and a pull quote',
    category: 'Content',
    keywords: ['bio', 'intro', 'summary', 'bullets'],
    create: () => ({
      heading: 'About Me',
      intro: 'A sentence or two about what you build and why.',
      bullets: ['🔭 Currently working on …', '🌱 Currently learning …', '💬 Ask me about …'],
      quote: '',
      align: 'left'
    })
  },
  techStack: {
    label: 'Tech stack',
    icon: 'i-lucide-layers',
    description: 'Icon grid or badge row of your tools',
    category: 'Content',
    keywords: ['skills', 'tools', 'languages', 'icons', 'skillicons'],
    create: () => ({
      heading: 'Tech Stack',
      icons: ['ts', 'vue', 'nuxtjs', 'nodejs', 'tailwind', 'postgres', 'docker', 'git'],
      perLine: 10,
      theme: 'dark',
      align: 'center',
      provider: 'skillicons',
      badgeStyle: 'for-the-badge'
    })
  },
  stats: {
    label: 'GitHub stats',
    icon: 'i-lucide-bar-chart-3',
    description: 'Stat card, streak, and a language chart',
    category: 'Graphs',
    keywords: ['cards', 'streak', 'languages', 'donut', 'pie', 'chart'],
    create: () => ({
      heading: 'GitHub Stats',
      username: '',
      theme: 'tokyonight',
      showStats: true,
      showStreak: false,
      showTopLangs: true,
      sideBySide: true,
      langLayout: 'compact',
      langsCount: 8,
      showIcons: true,
      hideBorder: true,
      hideRank: false,
      includeAllCommits: true,
      borderRadius: 8
    })
  },
  activity: {
    label: 'Activity graph',
    icon: 'i-lucide-line-chart',
    description: 'Your contribution history as a line chart',
    category: 'Graphs',
    keywords: ['contributions', 'commits', 'chart', 'history', 'timeline'],
    create: () => ({
      heading: 'Contribution Activity',
      username: '',
      theme: 'github-compact',
      days: 31,
      height: 300,
      area: true,
      radius: 16,
      hideBorder: true,
      hideTitle: false,
      customTitle: '',
      align: 'center'
    })
  },
  trophies: {
    label: 'Trophies',
    icon: 'i-lucide-trophy',
    description: 'Ranked achievement tiles',
    category: 'Graphs',
    keywords: ['awards', 'achievements', 'ranks', 'medals'],
    create: () => ({
      heading: 'Trophies',
      username: '',
      theme: 'onedark',
      titles: [],
      column: 6,
      row: 1,
      marginW: 8,
      marginH: 8,
      noFrame: true,
      noBackground: true,
      align: 'center'
    })
  },
  repos: {
    label: 'Pinned repos',
    icon: 'i-lucide-book-marked',
    description: 'Repository cards with stars and languages',
    category: 'Graphs',
    keywords: ['projects', 'pins', 'work', 'portfolio', 'cards'],
    create: () => ({
      heading: 'Featured Projects',
      username: '',
      repos: [],
      theme: 'tokyonight',
      perRow: 2,
      showOwner: false,
      hideBorder: true,
      borderRadius: 8,
      align: 'center'
    })
  },
  snake: {
    label: 'Contribution snake',
    icon: 'i-lucide-worm',
    description: 'A snake that eats your commit grid',
    category: 'Motion',
    keywords: ['animation', 'animated', 'game', 'grid', 'contributions'],
    needsSetup: true,
    create: () => ({
      username: '',
      branch: 'output',
      darkVariant: true,
      align: 'center'
    })
  },
  badges: {
    label: 'Custom badges',
    icon: 'i-lucide-badge-check',
    description: 'Any shields.io badge, built field by field',
    category: 'Content',
    keywords: ['shields', 'labels', 'status', 'pills', 'tags'],
    create: () => ({
      heading: '',
      items: [
        { label: 'Status', message: 'Open to work', color: '10B981', logo: '', href: '' },
        { label: 'Focus', message: 'Building', color: 'A9D93B', logo: 'rocket', href: '' }
      ],
      style: 'for-the-badge',
      align: 'center'
    })
  },
  socials: {
    label: 'Socials',
    icon: 'i-lucide-share-2',
    description: 'Badge links to your profiles',
    category: 'Links',
    keywords: ['contact', 'links', 'profiles', 'connect'],
    create: () => ({
      heading: 'Connect With Me',
      links: [
        { platform: 'linkedin', value: '' },
        { platform: 'x', value: '' }
      ],
      align: 'center',
      style: 'for-the-badge',
      showLabels: true
    })
  },
  support: {
    label: 'Sponsor buttons',
    icon: 'i-lucide-heart-handshake',
    description: 'Coffee, Ko-fi, Sponsors, and friends',
    category: 'Links',
    keywords: ['donate', 'funding', 'coffee', 'kofi', 'patreon', 'sponsor'],
    create: () => ({
      heading: 'Support My Work',
      text: 'If something here saved you an afternoon, this keeps it going.',
      links: [{ platform: 'buymeacoffee', value: '' }],
      style: 'for-the-badge',
      align: 'center'
    })
  },
  quote: {
    label: 'Dev quote',
    icon: 'i-lucide-quote',
    description: 'A programming quote, new on each load',
    category: 'Content',
    keywords: ['random', 'inspiration', 'saying'],
    create: () => ({
      layout: 'horizontal',
      theme: 'tokyonight',
      border: false,
      animate: true,
      align: 'center'
    })
  },
  table: {
    label: 'Table',
    icon: 'i-lucide-table',
    description: 'A grid of anything — projects, roles, links',
    category: 'Content',
    keywords: ['grid', 'rows', 'columns', 'projects', 'experience'],
    create: () => ({
      heading: 'Projects',
      columns: ['Project', 'What it does', 'Stack'],
      rows: [
        ['', '', ''],
        ['', '', '']
      ],
      columnAlign: 'left'
    })
  },
  divider: {
    label: 'Divider',
    icon: 'i-lucide-minus',
    description: 'A rule, a wave, or plain breathing room',
    category: 'Structure',
    keywords: ['separator', 'line', 'break', 'spacer', 'hr'],
    create: () => ({
      style: 'gradient',
      height: 3,
      colorMode: 'gradient',
      colorFrom: 'C5F74F',
      colorTo: '404040'
    })
  },
  markdown: {
    label: 'Custom Markdown',
    icon: 'i-lucide-code',
    description: 'Escape hatch — write anything',
    category: 'Content',
    keywords: ['raw', 'html', 'custom', 'freeform'],
    create: () => ({
      source: '## Custom section\n\nWrite any Markdown here.'
    })
  }
}

/**
 * How the palette groups and orders the block types.
 *
 * Ordered by what someone builds first rather than alphabetically: the shape of
 * the page, then what it says, then the data, then the flourishes.
 */
export const BLOCK_CATEGORIES = [
  { label: 'Structure', icon: 'i-lucide-layout-template', types: ['header', 'banner', 'divider'] },
  { label: 'Content', icon: 'i-lucide-text', types: ['about', 'techStack', 'badges', 'table', 'quote', 'markdown'] },
  { label: 'Graphs', icon: 'i-lucide-chart-column', types: ['stats', 'activity', 'trophies', 'repos'] },
  { label: 'Motion', icon: 'i-lucide-sparkles', types: ['typing', 'snake'] },
  { label: 'Links', icon: 'i-lucide-link', types: ['socials', 'support'] }
] as const satisfies readonly { label: BlockCategory, icon: string, types: readonly BlockType[] }[]

/** Any block type the palette above forgot to list. Should always be `never`. */
type Uncategorised = Exclude<BlockType, typeof BLOCK_CATEGORIES[number]['types'][number]>

/**
 * Flat order, derived so the two can never disagree about which types exist.
 *
 * The conditional annotation is the enforcement: while every type appears in
 * `BLOCK_CATEGORIES` this resolves to `BlockType[]` and the assignment is
 * ordinary, but the moment one is missing it collapses to `never` and this line
 * stops compiling. Without it a forgotten type would not error — it would just
 * quietly never appear in the "Add block" palette.
 */
export const BLOCK_ORDER: [Uncategorised] extends [never] ? BlockType[] : never
  = BLOCK_CATEGORIES.flatMap(({ types }) => types)
