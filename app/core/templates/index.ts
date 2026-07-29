import { createBlock } from '~/core/blocks'
import type { Block, BlockOf, BlockPropsMap, BlockType } from '~/types'

export type TemplateCategory = 'Minimal' | 'Developer' | 'Student' | 'Open source' | 'Data' | 'Creator'

export interface ReadmeTemplate {
  slug: string
  name: string
  category: TemplateCategory
  description: string
  audience: string
  accent: string
  featured?: boolean
  blocks: () => Block[]
}

/**
 * Template documents use the same block factory as the builder. That keeps
 * defaults, generated IDs, rendering, persistence, and editing in one system.
 */
function templateBlock<K extends BlockType>(
  type: K,
  props: Partial<BlockPropsMap[K]>
): BlockOf<K> {
  const block = createBlock(type)
  Object.assign(block.props, props)
  return block
}

export const README_TEMPLATES: ReadmeTemplate[] = [
  {
    slug: 'quiet-craft',
    name: 'Quiet Craft',
    category: 'Minimal',
    description: 'A calm, text-first profile that lets your work speak without decorative noise.',
    audience: 'Independent developers and engineers',
    accent: '#C5F74F',
    featured: true,
    blocks: () => [
      templateBlock('header', {
        name: 'Alex Morgan',
        tagline: 'Software engineer building useful things.',
        username: 'octocat',
        align: 'left',
        showFollowers: true,
        badgeStyle: 'flat-square'
      }),
      templateBlock('about', {
        heading: 'A little about me',
        intro: 'I turn complicated product ideas into fast, dependable software.',
        bullets: [
          'Building thoughtful developer tools and web products',
          'Interested in distributed systems and interface design',
          'Open to collaborating on useful open-source projects'
        ],
        quote: 'Simple systems are easier to understand, operate, and improve.'
      }),
      templateBlock('techStack', {
        heading: 'Tools I reach for',
        icons: ['ts', 'vue', 'nuxtjs', 'nodejs', 'postgres', 'docker'],
        perLine: 6,
        align: 'left',
        theme: 'light'
      }),
      templateBlock('table', {
        heading: 'Selected work',
        columns: ['Project', 'Purpose', 'Built with'],
        rows: [
          ['Signal', 'A focused team knowledge base', 'Nuxt · Postgres'],
          ['Patchwork', 'Release notes without the busywork', 'TypeScript · Node']
        ]
      }),
      templateBlock('socials', {
        heading: 'Find me elsewhere',
        links: [
          { platform: 'github', value: 'octocat' },
          { platform: 'linkedin', value: 'alex-morgan' },
          { platform: 'email', value: 'hello@example.com' }
        ],
        align: 'left',
        style: 'flat-square'
      })
    ]
  },
  {
    slug: 'full-stack-signal',
    name: 'Full-stack Signal',
    category: 'Developer',
    description: 'A complete technical profile with live stats, featured projects, and a strong introduction.',
    audience: 'Full-stack and product engineers',
    accent: '#58A6FF',
    featured: true,
    blocks: () => [
      templateBlock('banner', {
        text: 'Maya Chen',
        subtext: 'I design, build, and ship web products',
        colorFrom: '0D1117',
        colorTo: '58A6FF',
        fontAlignY: 38,
        height: 190
      }),
      templateBlock('header', {
        name: 'Hey, I’m Maya 👋',
        tagline: 'Full-stack engineer · product thinker · open-source contributor',
        username: 'octocat',
        showVisitorBadge: true,
        showFollowers: true,
        badgeColor: '58A6FF',
        badgeStyle: 'flat-square'
      }),
      templateBlock('typing', {
        lines: ['Shipping reliable products', 'Turning ideas into interfaces', 'Learning in public'],
        color: '58A6FF',
        font: 'Ubuntu Mono'
      }),
      templateBlock('about', {
        heading: 'What I do',
        intro: 'I build end-to-end web experiences with a focus on clarity, performance, and maintainable systems.',
        bullets: [
          'Working on collaborative tools for small teams',
          'Exploring practical AI workflows',
          'Happy to talk about TypeScript, Vue, and product engineering'
        ]
      }),
      templateBlock('techStack', {
        icons: ['ts', 'vue', 'nuxtjs', 'nodejs', 'tailwind', 'postgres', 'redis', 'docker', 'aws', 'git'],
        perLine: 10
      }),
      templateBlock('repos', {
        username: 'octocat',
        repos: ['Spoon-Knife', 'Hello-World'],
        theme: 'github_dark',
        hideBorder: false
      }),
      templateBlock('stats', {
        username: 'octocat',
        theme: 'github_dark',
        showStreak: true,
        hideBorder: false
      }),
      templateBlock('activity', {
        username: 'octocat',
        theme: 'github-dark',
        days: 45
      }),
      templateBlock('socials', {
        links: [
          { platform: 'github', value: 'octocat' },
          { platform: 'linkedin', value: 'maya-chen' },
          { platform: 'x', value: 'mayabuilds' },
          { platform: 'website', value: 'https://example.com' }
        ],
        style: 'flat-square'
      })
    ]
  },
  {
    slug: 'learning-in-public',
    name: 'Learning in Public',
    category: 'Student',
    description: 'A friendly profile for showing what you are learning, building, and aiming for next.',
    audience: 'Students and early-career developers',
    accent: '#F7B955',
    blocks: () => [
      templateBlock('header', {
        name: 'Hi, I’m Sam Rivera 🌱',
        tagline: 'Computer science student · curious builder',
        username: 'octocat',
        badgeColor: 'F7B955',
        showVisitorBadge: true,
        badgeStyle: 'flat'
      }),
      templateBlock('typing', {
        lines: ['Learning one commit at a time', 'Building my first useful products', 'Looking for an internship'],
        color: 'F7B955',
        size: 24,
        font: 'Ubuntu Mono'
      }),
      templateBlock('about', {
        heading: 'Right now',
        intro: 'I am learning by turning small ideas into projects I can share.',
        bullets: [
          'Studying data structures and software engineering',
          'Building a campus event finder',
          'Looking for a software engineering internship',
          'Ask me about Python, JavaScript, or student communities'
        ]
      }),
      templateBlock('techStack', {
        heading: 'What I’m learning',
        icons: ['python', 'js', 'html', 'css', 'react', 'git', 'github', 'figma'],
        perLine: 8
      }),
      templateBlock('table', {
        heading: 'Learning log',
        columns: ['Focus', 'Project', 'Status'],
        rows: [
          ['Frontend', 'Campus event finder', 'Building'],
          ['Algorithms', '100-day problem set', 'In progress'],
          ['Open source', 'First documentation PR', 'Shipped']
        ],
        columnAlign: 'left'
      }),
      templateBlock('stats', {
        username: 'octocat',
        theme: 'transparent',
        showStats: true,
        showTopLangs: true,
        hideBorder: false,
        includeAllCommits: false
      }),
      templateBlock('socials', {
        heading: 'Let’s learn together',
        links: [
          { platform: 'github', value: 'octocat' },
          { platform: 'linkedin', value: 'sam-rivera' },
          { platform: 'email', value: 'sam@example.com' }
        ],
        style: 'flat'
      })
    ]
  },
  {
    slug: 'open-source-pulse',
    name: 'Open-source Pulse',
    category: 'Open source',
    description: 'An active maintainer profile built around contributions, repositories, and community.',
    audience: 'Maintainers and open-source contributors',
    accent: '#A371F7',
    featured: true,
    blocks: () => [
      templateBlock('header', {
        name: 'Jordan Lee',
        tagline: 'Open-source maintainer making developer tools more approachable.',
        username: 'octocat',
        showFollowers: true,
        showStars: true,
        showVisitorBadge: true,
        badgeColor: 'A371F7',
        badgeStyle: 'flat-square'
      }),
      templateBlock('badges', {
        items: [
          { label: 'Maintainer', message: 'Active', color: 'A371F7', logo: 'github', href: '' },
          { label: 'PRs', message: 'Welcome', color: '2EA043', logo: 'git', href: '' },
          { label: 'Discussions', message: 'Open', color: '58A6FF', logo: 'github', href: '' }
        ],
        style: 'flat-square'
      }),
      templateBlock('about', {
        heading: 'Open source, made human',
        intro: 'I maintain tools that remove friction from everyday development.',
        bullets: [
          'Maintaining accessible frontend infrastructure',
          'Reviewing first-time contributions',
          'Writing practical guides for library authors'
        ],
        quote: 'A healthy project is a welcoming conversation, not just a codebase.'
      }),
      templateBlock('repos', {
        username: 'octocat',
        repos: ['Spoon-Knife', 'Hello-World'],
        theme: 'aura_dark',
        hideBorder: false
      }),
      templateBlock('activity', {
        username: 'octocat',
        theme: 'github-dark',
        days: 60,
        height: 280
      }),
      templateBlock('trophies', {
        username: 'octocat',
        theme: 'aura',
        titles: ['Stars', 'Commits', 'PullRequest', 'Reviews'],
        column: 4
      }),
      templateBlock('stats', {
        username: 'octocat',
        theme: 'aura_dark',
        showStreak: true
      }),
      templateBlock('socials', {
        heading: 'Community',
        links: [
          { platform: 'github', value: 'octocat' },
          { platform: 'discord', value: 'https://discord.com' },
          { platform: 'mastodon', value: 'https://mastodon.social/@example' }
        ],
        style: 'flat-square'
      }),
      templateBlock('support', {
        heading: 'Support the work',
        text: 'If these projects help you, sponsorship keeps maintenance sustainable.',
        links: [{ platform: 'githubsponsors', value: 'octocat' }],
        style: 'flat-square'
      })
    ]
  },
  {
    slug: 'data-field-notes',
    name: 'Data Field Notes',
    category: 'Data',
    description: 'A precise, project-led profile for data engineers, analysts, and ML practitioners.',
    audience: 'Data, analytics, and ML engineers',
    accent: '#39D0C3',
    blocks: () => [
      templateBlock('banner', {
        shape: 'soft',
        text: 'Priya Nair',
        subtext: 'Data engineer · systems thinker',
        colorFrom: '102A2A',
        colorTo: '39D0C3',
        height: 175,
        fontSize: 42,
        animation: 'scaleIn'
      }),
      templateBlock('about', {
        heading: 'From raw data to useful decisions',
        intro: 'I design dependable data platforms and turn messy questions into measurable answers.',
        bullets: [
          'Building observable batch and streaming pipelines',
          'Improving data quality through contracts and testing',
          'Experimenting with practical retrieval systems'
        ]
      }),
      templateBlock('techStack', {
        heading: 'Data toolkit',
        icons: ['python', 'postgres', 'redis', 'docker', 'kubernetes', 'aws', 'terraform', 'git'],
        perLine: 8,
        provider: 'badges',
        badgeStyle: 'flat-square'
      }),
      templateBlock('table', {
        heading: 'Recent field notes',
        columns: ['System', 'Outcome', 'Stack'],
        rows: [
          ['Event pipeline', 'Cut reporting delay from hours to minutes', 'Python · Kafka · AWS'],
          ['Quality platform', 'Made freshness and schema drift visible', 'dbt · Postgres'],
          ['Search prototype', 'Grounded answers in internal knowledge', 'Python · pgvector']
        ]
      }),
      templateBlock('activity', {
        username: 'octocat',
        theme: 'aqua',
        days: 45
      }),
      templateBlock('stats', {
        username: 'octocat',
        theme: 'blue-green',
        langLayout: 'donut',
        hideBorder: false
      }),
      templateBlock('socials', {
        links: [
          { platform: 'github', value: 'octocat' },
          { platform: 'linkedin', value: 'priya-nair' },
          { platform: 'kaggle', value: 'priyanair' },
          { platform: 'email', value: 'priya@example.com' }
        ],
        style: 'flat-square'
      })
    ]
  },
  {
    slug: 'creative-system',
    name: 'Creative System',
    category: 'Creator',
    description: 'A visual, personality-forward profile connecting design craft with technical execution.',
    audience: 'Design engineers and digital creators',
    accent: '#FF7B72',
    blocks: () => [
      templateBlock('banner', {
        shape: 'venom',
        text: 'Noah Kim',
        subtext: 'Designing interfaces with code',
        colorFrom: 'FF7B72',
        colorTo: 'A371F7',
        height: 210,
        fontSize: 46,
        fontAlignY: 40,
        animation: 'twinkling'
      }),
      templateBlock('header', {
        name: 'Designer × Developer',
        tagline: 'I make digital products feel clear, expressive, and alive.',
        username: 'octocat',
        showVisitorBadge: true,
        badgeColor: 'FF7B72',
        badgeStyle: 'flat-square'
      }),
      templateBlock('about', {
        heading: 'The work',
        intro: 'I work across product design and frontend engineering, from the first sketch to the final interaction.',
        bullets: [
          'Design systems that teams actually enjoy using',
          'Prototypes that answer product questions early',
          'Accessible interfaces with considered motion'
        ]
      }),
      templateBlock('techStack', {
        heading: 'Studio tools',
        icons: ['figma', 'ts', 'react', 'nextjs', 'tailwind', 'vite', 'git'],
        perLine: 7
      }),
      templateBlock('table', {
        heading: 'Selected projects',
        columns: ['Project', 'Role', 'Result'],
        rows: [
          ['Orbit', 'Design system lead', 'Unified 4 product teams'],
          ['Canvas', 'Design engineer', 'Shipped an accessible editor'],
          ['Tempo', 'Product designer', 'Simplified team planning']
        ]
      }),
      templateBlock('badges', {
        heading: 'Available for',
        items: [
          { label: '', message: 'Design systems', color: 'FF7B72', logo: 'figma', href: '' },
          { label: '', message: 'Frontend', color: 'A371F7', logo: 'typescript', href: '' },
          { label: '', message: 'Speaking', color: '58A6FF', logo: 'googlecalendar', href: '' }
        ],
        style: 'flat-square'
      }),
      templateBlock('socials', {
        heading: 'Say hello',
        links: [
          { platform: 'github', value: 'octocat' },
          { platform: 'figma', value: 'https://figma.com/@example' },
          { platform: 'dribbble', value: 'noahkim' },
          { platform: 'website', value: 'https://example.com' }
        ],
        style: 'flat-square'
      })
    ]
  }
]

export const TEMPLATE_CATEGORIES: Array<'All' | TemplateCategory> = [
  'All',
  'Minimal',
  'Developer',
  'Student',
  'Open source',
  'Data',
  'Creator'
]

export function getReadmeTemplate(slug: string): ReadmeTemplate | undefined {
  return README_TEMPLATES.find(template => template.slug === slug)
}
