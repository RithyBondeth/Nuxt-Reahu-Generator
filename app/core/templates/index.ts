import { createBlock } from '~/core/blocks'
import type { Block, BlockOf, BlockPropsMap, BlockType } from '~/types'
import type { TemplateSlug } from '~~/site.config'

export type TemplateCategory = 'Minimal' | 'Developer' | 'Student' | 'Open source' | 'Data' | 'Creator'

export interface ReadmeTemplate {
  slug: TemplateSlug
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
  },
  {
    slug: 'backend-blueprint',
    name: 'Backend Blueprint',
    category: 'Developer',
    description: 'A systems-focused profile built around architecture, APIs, reliability, and measurable engineering work.',
    audience: 'Backend and platform engineers',
    accent: '#79C0FF',
    blocks: () => [
      templateBlock('header', {
        name: 'Elias Brooks',
        tagline: 'Backend engineer designing systems that stay boring in production.',
        username: 'octocat',
        align: 'left',
        showFollowers: true,
        showStars: true,
        badgeColor: '79C0FF',
        badgeStyle: 'flat-square'
      }),
      templateBlock('about', {
        heading: 'Engineering dependable systems',
        intro: 'I work on the services, data models, and operational details behind reliable products.',
        bullets: [
          'Designing versioned APIs and event-driven workflows',
          'Improving latency, observability, and failure recovery',
          'Writing architecture notes that help teams make better decisions'
        ],
        quote: 'The best infrastructure gives product teams fewer things to worry about.'
      }),
      templateBlock('techStack', {
        heading: 'Core stack',
        icons: ['go', 'python', 'nodejs', 'postgres', 'redis', 'kafka', 'docker', 'kubernetes'],
        perLine: 8,
        provider: 'badges',
        badgeStyle: 'flat-square',
        align: 'left'
      }),
      templateBlock('table', {
        heading: 'Systems shipped',
        columns: ['System', 'Responsibility', 'Impact'],
        rows: [
          ['Event platform', 'Architecture and delivery', 'Processed 40M events/day'],
          ['Billing API', 'Reliability lead', 'Reduced failed jobs by 72%'],
          ['Developer platform', 'Core contributor', 'Cut service setup to 15 minutes']
        ]
      }),
      templateBlock('activity', {
        username: 'octocat',
        theme: 'github-dark',
        days: 31,
        height: 260,
        hideTitle: true,
        align: 'left'
      }),
      templateBlock('repos', {
        username: 'octocat',
        repos: ['Hello-World', 'Spoon-Knife'],
        theme: 'github_dark_dimmed',
        hideBorder: false,
        align: 'left'
      }),
      templateBlock('socials', {
        heading: 'Get in touch',
        links: [
          { platform: 'github', value: 'octocat' },
          { platform: 'linkedin', value: 'elias-brooks' },
          { platform: 'email', value: 'elias@example.com' }
        ],
        align: 'left',
        style: 'flat-square'
      })
    ]
  },
  {
    slug: 'mobile-momentum',
    name: 'Mobile Momentum',
    category: 'Developer',
    description: 'A polished mobile-engineering profile with product outcomes, platform skills, and shipped apps.',
    audience: 'iOS, Android, and Flutter developers',
    accent: '#BC8CFF',
    blocks: () => [
      templateBlock('banner', {
        shape: 'cylinder',
        text: 'Amina Yusuf',
        subtext: 'Mobile engineer · delightful apps, dependable releases',
        colorFrom: '7C3AED',
        colorTo: 'EC4899',
        height: 190,
        fontSize: 44,
        fontAlignY: 39,
        animation: 'fadeIn'
      }),
      templateBlock('typing', {
        lines: ['Building for the small screen', 'Obsessing over smooth interactions', 'Shipping with confidence'],
        font: 'Ubuntu Mono',
        color: 'BC8CFF',
        size: 25
      }),
      templateBlock('about', {
        heading: 'Product craft in your pocket',
        intro: 'I build mobile experiences that feel native, accessible, and resilient on real-world networks.',
        bullets: [
          'Leading Flutter features from prototype to store release',
          'Improving startup time and offline behavior',
          'Building reusable UI foundations across product teams'
        ]
      }),
      templateBlock('techStack', {
        heading: 'Mobile toolkit',
        icons: ['flutter', 'dart', 'kotlin', 'swift', 'androidstudio', 'firebase', 'figma', 'git'],
        perLine: 8
      }),
      templateBlock('table', {
        heading: 'Apps shipped',
        columns: ['Product', 'Contribution', 'Highlight'],
        rows: [
          ['Pocket Local', 'Lead mobile engineer', 'Offline-first city guides'],
          ['Pulse', 'Flutter developer', 'Accessible health tracking'],
          ['Relay', 'Platform contributor', 'Shared design system']
        ]
      }),
      templateBlock('stats', {
        username: 'octocat',
        theme: 'midnight-purple',
        showStreak: true,
        hideBorder: false
      }),
      templateBlock('socials', {
        heading: 'Follow the builds',
        links: [
          { platform: 'github', value: 'octocat' },
          { platform: 'linkedin', value: 'amina-yusuf' },
          { platform: 'medium', value: 'aminabuilds' },
          { platform: 'website', value: 'https://example.com' }
        ],
        style: 'flat-square'
      })
    ]
  },
  {
    slug: 'cloud-control-room',
    name: 'Cloud Control Room',
    category: 'Developer',
    description: 'An operations-led profile for showing cloud platforms, automation, observability, and uptime wins.',
    audience: 'DevOps, SRE, and cloud engineers',
    accent: '#56D364',
    featured: true,
    blocks: () => [
      templateBlock('banner', {
        shape: 'slice',
        text: 'Marcus Reed',
        subtext: 'Site reliability engineer',
        colorFrom: '0D1117',
        colorTo: '238636',
        height: 175,
        fontSize: 44,
        animation: 'scaleIn'
      }),
      templateBlock('badges', {
        heading: '',
        items: [
          { label: 'Uptime', message: '99.99%', color: '238636', logo: 'statuspage', href: '' },
          { label: 'On-call', message: 'Human first', color: '58A6FF', logo: 'pagerduty', href: '' },
          { label: 'Changes', message: 'Automated', color: 'A371F7', logo: 'githubactions', href: '' }
        ],
        style: 'flat-square'
      }),
      templateBlock('about', {
        heading: 'Reliable by design',
        intro: 'I build cloud platforms that make the safe path the easy path.',
        bullets: [
          'Operating multi-region services with practical SLOs',
          'Automating delivery, policy, and infrastructure changes',
          'Turning incidents into durable system improvements'
        ]
      }),
      templateBlock('techStack', {
        heading: 'Control room',
        icons: ['linux', 'aws', 'kubernetes', 'docker', 'terraform', 'ansible', 'githubactions', 'prometheus', 'grafana', 'sentry'],
        perLine: 10,
        provider: 'badges',
        badgeStyle: 'flat-square'
      }),
      templateBlock('table', {
        heading: 'Operational outcomes',
        columns: ['Initiative', 'What changed', 'Outcome'],
        rows: [
          ['Progressive delivery', 'Automated canaries and rollback', '41% fewer incidents'],
          ['Golden signals', 'Unified service dashboards', 'MTTR down to 18 min'],
          ['Platform templates', 'Secure defaults as code', '3× faster onboarding']
        ]
      }),
      templateBlock('activity', {
        username: 'octocat',
        theme: 'green',
        days: 60,
        area: true,
        height: 270
      }),
      templateBlock('stats', {
        username: 'octocat',
        theme: 'github_dark',
        showTopLangs: false,
        showStreak: true,
        hideBorder: false
      }),
      templateBlock('socials', {
        heading: 'Connect',
        links: [
          { platform: 'github', value: 'octocat' },
          { platform: 'linkedin', value: 'marcus-reed' },
          { platform: 'devto', value: 'marcusops' }
        ],
        style: 'flat-square'
      })
    ]
  },
  {
    slug: 'research-ledger',
    name: 'Research Ledger',
    category: 'Data',
    description: 'A citation-friendly academic profile for research interests, publications, methods, and reproducible work.',
    audience: 'Researchers and graduate students',
    accent: '#2F81F7',
    blocks: () => [
      templateBlock('header', {
        name: 'Dr. Lena Ortiz',
        tagline: 'Computational social scientist · open and reproducible research',
        username: 'octocat',
        align: 'left',
        showFollowers: true,
        badgeColor: '2F81F7',
        badgeStyle: 'flat'
      }),
      templateBlock('about', {
        heading: 'Research focus',
        intro: 'I study how people find, evaluate, and share information in online communities.',
        bullets: [
          'Computational methods for social and behavioral data',
          'Transparent research software and reproducible pipelines',
          'Human-centered evaluation of machine learning systems'
        ],
        align: 'left'
      }),
      templateBlock('techStack', {
        heading: 'Methods and tools',
        icons: ['python', 'r', 'julia', 'postgres', 'pytorch', 'sklearn', 'latex', 'git'],
        perLine: 8,
        theme: 'light',
        align: 'left'
      }),
      templateBlock('table', {
        heading: 'Selected publications',
        columns: ['Year', 'Work', 'Venue'],
        rows: [
          ['2026', 'Tracing trust across community networks', 'CSCW'],
          ['2025', 'Auditing evidence in generated answers', 'FAccT'],
          ['2024', 'Reproducible pipelines for public datasets', 'JOSS']
        ]
      }),
      templateBlock('badges', {
        heading: 'Research principles',
        items: [
          { label: '', message: 'Open data', color: '2F81F7', logo: 'dataverse', href: '' },
          { label: '', message: 'Open methods', color: '1F883D', logo: 'openaccess', href: '' },
          { label: '', message: 'Reproducible', color: '8250DF', logo: 'github', href: '' }
        ],
        style: 'flat'
      }),
      templateBlock('socials', {
        heading: 'Profiles',
        links: [
          { platform: 'github', value: 'octocat' },
          { platform: 'scholar', value: 'example' },
          { platform: 'orcid', value: '0000-0000-0000-0000' },
          { platform: 'researchgate', value: 'profile/Lena-Ortiz' },
          { platform: 'email', value: 'lena@example.edu' }
        ],
        align: 'left',
        style: 'flat'
      })
    ]
  },
  {
    slug: 'freelance-studio',
    name: 'Freelance Studio',
    category: 'Creator',
    description: 'A client-ready profile that clearly presents services, proof, availability, and the next step.',
    audience: 'Freelancers and consultants',
    accent: '#FF9B73',
    blocks: () => [
      templateBlock('header', {
        name: 'Nia Campbell',
        tagline: 'Independent designer and frontend developer helping small teams ship.',
        username: 'octocat',
        align: 'left',
        showVisitorBadge: false,
        showFollowers: true,
        badgeColor: 'FF9B73',
        badgeStyle: 'flat-square'
      }),
      templateBlock('badges', {
        heading: '',
        items: [
          { label: 'Availability', message: 'October 2026', color: '1F883D', logo: 'googlecalendar', href: '' },
          { label: 'Timezone', message: 'UTC +1', color: '2F81F7', logo: 'clockify', href: '' },
          { label: 'Projects', message: 'Remote', color: '8250DF', logo: 'zoom', href: '' }
        ],
        style: 'flat-square',
        align: 'left'
      }),
      templateBlock('about', {
        heading: 'How I can help',
        intro: 'I partner with focused teams to turn early ideas and rough interfaces into polished, maintainable products.',
        bullets: [
          'Product UI design and interactive prototyping',
          'Frontend implementation with Vue or React',
          'Design-system foundations and accessibility reviews'
        ],
        quote: 'Small team, direct communication, no handoff maze.'
      }),
      templateBlock('table', {
        heading: 'Recent client work',
        columns: ['Engagement', 'Scope', 'Result'],
        rows: [
          ['Fintech dashboard', 'Product design + Vue', 'Launched in 10 weeks'],
          ['Healthcare portal', 'Accessibility overhaul', 'Reached WCAG AA'],
          ['SaaS design system', 'Audit + implementation', '34 shared components']
        ]
      }),
      templateBlock('techStack', {
        heading: 'Tools',
        icons: ['figma', 'ts', 'vue', 'react', 'nuxtjs', 'tailwind', 'vite', 'git'],
        perLine: 8,
        theme: 'light',
        align: 'left'
      }),
      templateBlock('socials', {
        heading: 'Start a conversation',
        links: [
          { platform: 'website', value: 'https://example.com' },
          { platform: 'linkedin', value: 'nia-campbell' },
          { platform: 'calendly', value: 'nia-campbell/intro' },
          { platform: 'email', value: 'hello@example.com' }
        ],
        align: 'left',
        style: 'flat-square'
      })
    ]
  },
  {
    slug: 'indie-launch',
    name: 'Indie Launch',
    category: 'Creator',
    description: 'A high-energy maker profile for products, experiments, public metrics, and building in public.',
    audience: 'Indie hackers and product founders',
    accent: '#F2CC60',
    blocks: () => [
      templateBlock('banner', {
        shape: 'waving',
        text: 'Ravi Shah',
        subtext: 'Small products. Real customers. Constant learning.',
        colorFrom: 'D29922',
        colorTo: '8250DF',
        height: 195,
        fontSize: 43,
        fontAlignY: 38,
        animation: 'twinkling'
      }),
      templateBlock('typing', {
        lines: ['Building useful internet businesses', 'Sharing the numbers and lessons', 'Currently shipping: TinyDesk'],
        font: 'Ubuntu Mono',
        color: 'F2CC60',
        size: 25
      }),
      templateBlock('badges', {
        heading: '',
        items: [
          { label: 'Products', message: '4 shipped', color: '8250DF', logo: 'producthunt', href: '' },
          { label: 'Users', message: '2.4k', color: '2F81F7', logo: 'googleanalytics', href: '' },
          { label: 'Mode', message: 'Bootstrapped', color: 'D29922', logo: 'rocket', href: '' }
        ],
        style: 'for-the-badge'
      }),
      templateBlock('about', {
        heading: 'What I’m building',
        intro: 'I make small software products for independent teams and document the decisions behind them.',
        bullets: [
          'TinyDesk — a lightweight customer inbox',
          'Launch Notes — changelogs people actually read',
          'Weekly build notes with honest numbers'
        ]
      }),
      templateBlock('table', {
        heading: 'Product shelf',
        columns: ['Product', 'For', 'Status'],
        rows: [
          ['TinyDesk', 'Small support teams', 'Growing'],
          ['Launch Notes', 'Indie SaaS founders', 'Profitable'],
          ['Minute Page', 'Fast product validation', 'Experiment']
        ]
      }),
      templateBlock('techStack', {
        heading: 'Built lean with',
        icons: ['ts', 'nextjs', 'tailwind', 'postgres', 'supabase', 'vercel', 'figma', 'github'],
        perLine: 8
      }),
      templateBlock('stats', {
        username: 'octocat',
        theme: 'gruvbox',
        showStreak: true,
        hideBorder: false
      }),
      templateBlock('socials', {
        heading: 'Build in public with me',
        links: [
          { platform: 'github', value: 'octocat' },
          { platform: 'x', value: 'ravibuilds' },
          { platform: 'producthunt', value: 'ravishah' },
          { platform: 'substack', value: 'ravibuilds.example.com' }
        ],
        style: 'for-the-badge'
      }),
      templateBlock('support', {
        heading: 'Enjoy the experiments?',
        text: 'Coffee powers the next tiny product.',
        links: [{ platform: 'buymeacoffee', value: 'ravibuilds' }],
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
