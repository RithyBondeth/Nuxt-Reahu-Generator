import type { BlockPropsMap, BlockType } from '~/types'

/**
 * Block metadata: what the "Add block" menu shows, and the props a freshly
 * created block starts with.
 *
 * Defaults live here rather than in the editors so that a block looks the same
 * however it was created — added by hand, duplicated, or seeded by the starter
 * document.
 */

export interface BlockDefinition<K extends BlockType> {
  label: string
  icon: string
  description: string
  create: () => BlockPropsMap[K]
}

export const BLOCK_DEFINITIONS: { [K in BlockType]: BlockDefinition<K> } = {
  header: {
    label: 'Header',
    icon: 'i-lucide-heading-1',
    description: 'Name, tagline, and an optional banner',
    create: () => ({
      name: 'Your Name',
      tagline: 'Full-stack developer',
      align: 'center',
      bannerUrl: '',
      showVisitorBadge: false,
      username: ''
    })
  },
  about: {
    label: 'About me',
    icon: 'i-lucide-user',
    description: 'A short intro and bullet points',
    create: () => ({
      heading: 'About Me',
      intro: 'A sentence or two about what you build and why.',
      bullets: ['🔭 Currently working on …', '🌱 Currently learning …', '💬 Ask me about …']
    })
  },
  techStack: {
    label: 'Tech stack',
    icon: 'i-lucide-layers',
    description: 'Icon grid of your tools',
    create: () => ({
      heading: 'Tech Stack',
      icons: ['ts', 'vue', 'nuxtjs', 'nodejs', 'tailwind', 'postgres', 'docker', 'git'],
      perLine: 10,
      theme: 'dark',
      align: 'center'
    })
  },
  stats: {
    label: 'GitHub stats',
    icon: 'i-lucide-bar-chart-3',
    description: 'Stat cards, streak, and top languages',
    create: () => ({
      heading: 'GitHub Stats',
      username: '',
      theme: 'tokyonight',
      showStats: true,
      showStreak: false,
      showTopLangs: true,
      sideBySide: true
    })
  },
  socials: {
    label: 'Socials',
    icon: 'i-lucide-share-2',
    description: 'Badge links to your profiles',
    create: () => ({
      heading: 'Connect With Me',
      links: [
        { platform: 'linkedin', value: '' },
        { platform: 'x', value: '' }
      ],
      align: 'center',
      style: 'for-the-badge'
    })
  },
  markdown: {
    label: 'Custom Markdown',
    icon: 'i-lucide-code',
    description: 'Escape hatch — write anything',
    create: () => ({
      source: '## Custom section\n\nWrite any Markdown here.'
    })
  }
}

/** Order the "Add block" menu presents types in. */
export const BLOCK_ORDER: BlockType[] = ['header', 'about', 'techStack', 'stats', 'socials', 'markdown']
