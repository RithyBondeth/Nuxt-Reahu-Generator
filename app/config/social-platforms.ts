import type { SocialPlatform } from '~/types'

interface PlatformDefinition {
  label: string
  /** shields.io badge background, hex without the leading `#`. */
  color: string
  /** simple-icons slug, used both as the badge logo and as the picker icon. */
  logo: string
  placeholder: string
  /** Turns whatever the user typed into a full href. */
  href: (value: string) => string
  /** Groups the platform in the picker. */
  group: PlatformGroup
}

type PlatformGroup = 'Core' | 'Code' | 'Writing' | 'Community' | 'Creative' | 'Work'

/** Accepts either a bare handle or an already-complete URL. */
const asUrl = (base: string) => (value: string) =>
  /^https?:\/\//i.test(value) ? value : `${base}${value.replace(/^@/, '')}`

export const SOCIAL_PLATFORMS: Record<SocialPlatform, PlatformDefinition> = {
  // ── Core ────────────────────────────────────────────────────────────────
  github: { label: 'GitHub', color: '181717', logo: 'github', placeholder: 'username', href: asUrl('https://github.com/'), group: 'Core' },
  linkedin: { label: 'LinkedIn', color: '0A66C2', logo: 'linkedin', placeholder: 'in/username', href: asUrl('https://linkedin.com/'), group: 'Core' },
  x: { label: 'X', color: '000000', logo: 'x', placeholder: '@handle', href: asUrl('https://x.com/'), group: 'Core' },
  bluesky: { label: 'Bluesky', color: '0285FF', logo: 'bluesky', placeholder: 'you.bsky.social', href: asUrl('https://bsky.app/profile/'), group: 'Core' },
  mastodon: { label: 'Mastodon', color: '6364FF', logo: 'mastodon', placeholder: 'https://mas.to/@you', href: asUrl('https://'), group: 'Core' },
  threads: { label: 'Threads', color: '000000', logo: 'threads', placeholder: '@handle', href: asUrl('https://threads.net/@'), group: 'Core' },
  website: { label: 'Portfolio', color: '4285F4', logo: 'googlechrome', placeholder: 'https://you.dev', href: asUrl('https://'), group: 'Core' },
  email: { label: 'Email', color: 'EA4335', logo: 'gmail', placeholder: 'you@mail.com', href: value => `mailto:${value}`, group: 'Core' },

  // ── Code ────────────────────────────────────────────────────────────────
  stackoverflow: { label: 'Stack Overflow', color: 'F58025', logo: 'stackoverflow', placeholder: 'users/123456/you', href: asUrl('https://stackoverflow.com/'), group: 'Code' },
  gitlab: { label: 'GitLab', color: 'FC6D26', logo: 'gitlab', placeholder: 'username', href: asUrl('https://gitlab.com/'), group: 'Code' },
  bitbucket: { label: 'Bitbucket', color: '0052CC', logo: 'bitbucket', placeholder: 'username', href: asUrl('https://bitbucket.org/'), group: 'Code' },
  leetcode: { label: 'LeetCode', color: 'FFA116', logo: 'leetcode', placeholder: 'username', href: asUrl('https://leetcode.com/u/'), group: 'Code' },
  hackerrank: { label: 'HackerRank', color: '00EA64', logo: 'hackerrank', placeholder: 'username', href: asUrl('https://hackerrank.com/'), group: 'Code' },
  codeforces: { label: 'Codeforces', color: '1F8ACB', logo: 'codeforces', placeholder: 'handle', href: asUrl('https://codeforces.com/profile/'), group: 'Code' },
  codepen: { label: 'CodePen', color: '000000', logo: 'codepen', placeholder: 'username', href: asUrl('https://codepen.io/'), group: 'Code' },
  npm: { label: 'npm', color: 'CB3837', logo: 'npm', placeholder: 'username', href: asUrl('https://npmjs.com/~'), group: 'Code' },
  pypi: { label: 'PyPI', color: '3775A9', logo: 'pypi', placeholder: 'username', href: asUrl('https://pypi.org/user/'), group: 'Code' },
  dockerhub: { label: 'Docker Hub', color: '2496ED', logo: 'docker', placeholder: 'username', href: asUrl('https://hub.docker.com/u/'), group: 'Code' },
  huggingface: { label: 'Hugging Face', color: 'FFD21E', logo: 'huggingface', placeholder: 'username', href: asUrl('https://huggingface.co/'), group: 'Code' },
  kaggle: { label: 'Kaggle', color: '20BEFF', logo: 'kaggle', placeholder: 'username', href: asUrl('https://kaggle.com/'), group: 'Code' },

  // ── Writing ─────────────────────────────────────────────────────────────
  medium: { label: 'Medium', color: '000000', logo: 'medium', placeholder: '@handle', href: asUrl('https://medium.com/@'), group: 'Writing' },
  devto: { label: 'DEV', color: '0A0A0A', logo: 'devdotto', placeholder: 'username', href: asUrl('https://dev.to/'), group: 'Writing' },
  hashnode: { label: 'Hashnode', color: '2962FF', logo: 'hashnode', placeholder: '@handle', href: asUrl('https://hashnode.com/@'), group: 'Writing' },
  substack: { label: 'Substack', color: 'FF6719', logo: 'substack', placeholder: 'you.substack.com', href: asUrl('https://'), group: 'Writing' },
  rss: { label: 'RSS', color: 'FFA500', logo: 'rss', placeholder: 'https://you.dev/feed.xml', href: asUrl('https://'), group: 'Writing' },
  notion: { label: 'Notion', color: '000000', logo: 'notion', placeholder: 'https://you.notion.site', href: asUrl('https://'), group: 'Writing' },

  // ── Community ───────────────────────────────────────────────────────────
  discord: { label: 'Discord', color: '5865F2', logo: 'discord', placeholder: 'invite code', href: asUrl('https://discord.gg/'), group: 'Community' },
  telegram: { label: 'Telegram', color: '26A5E4', logo: 'telegram', placeholder: '@handle', href: asUrl('https://t.me/'), group: 'Community' },
  whatsapp: { label: 'WhatsApp', color: '25D366', logo: 'whatsapp', placeholder: '15551234567', href: value => `https://wa.me/${value.replace(/\D/g, '')}`, group: 'Community' },
  reddit: { label: 'Reddit', color: 'FF4500', logo: 'reddit', placeholder: 'u/username', href: asUrl('https://reddit.com/'), group: 'Community' },
  facebook: { label: 'Facebook', color: '1877F2', logo: 'facebook', placeholder: 'username', href: asUrl('https://facebook.com/'), group: 'Community' },
  steam: { label: 'Steam', color: '000000', logo: 'steam', placeholder: 'id/username', href: asUrl('https://steamcommunity.com/'), group: 'Community' },

  // ── Creative ────────────────────────────────────────────────────────────
  instagram: { label: 'Instagram', color: 'E4405F', logo: 'instagram', placeholder: '@handle', href: asUrl('https://instagram.com/'), group: 'Creative' },
  youtube: { label: 'YouTube', color: 'FF0000', logo: 'youtube', placeholder: '@channel', href: asUrl('https://youtube.com/@'), group: 'Creative' },
  twitch: { label: 'Twitch', color: '9146FF', logo: 'twitch', placeholder: 'channel', href: asUrl('https://twitch.tv/'), group: 'Creative' },
  tiktok: { label: 'TikTok', color: '000000', logo: 'tiktok', placeholder: '@handle', href: asUrl('https://tiktok.com/@'), group: 'Creative' },
  vimeo: { label: 'Vimeo', color: '1AB7EA', logo: 'vimeo', placeholder: 'username', href: asUrl('https://vimeo.com/'), group: 'Creative' },
  dribbble: { label: 'Dribbble', color: 'EA4C89', logo: 'dribbble', placeholder: 'username', href: asUrl('https://dribbble.com/'), group: 'Creative' },
  behance: { label: 'Behance', color: '1769FF', logo: 'behance', placeholder: 'username', href: asUrl('https://behance.net/'), group: 'Creative' },
  figma: { label: 'Figma', color: 'F24E1E', logo: 'figma', placeholder: '@handle', href: asUrl('https://figma.com/@'), group: 'Creative' },
  pinterest: { label: 'Pinterest', color: 'BD081C', logo: 'pinterest', placeholder: 'username', href: asUrl('https://pinterest.com/'), group: 'Creative' },
  soundcloud: { label: 'SoundCloud', color: 'FF3300', logo: 'soundcloud', placeholder: 'username', href: asUrl('https://soundcloud.com/'), group: 'Creative' },
  spotify: { label: 'Spotify', color: '1DB954', logo: 'spotify', placeholder: 'user id', href: asUrl('https://open.spotify.com/user/'), group: 'Creative' },
  itch: { label: 'itch.io', color: 'FA5C5C', logo: 'itchdotio', placeholder: 'you.itch.io', href: asUrl('https://'), group: 'Creative' },

  // ── Work ────────────────────────────────────────────────────────────────
  calendly: { label: 'Book a call', color: '006BFF', logo: 'calendly', placeholder: 'username', href: asUrl('https://calendly.com/'), group: 'Work' },
  upwork: { label: 'Upwork', color: '6FDA44', logo: 'upwork', placeholder: 'freelancers/~012345', href: asUrl('https://upwork.com/'), group: 'Work' },
  fiverr: { label: 'Fiverr', color: '1DBF73', logo: 'fiverr', placeholder: 'username', href: asUrl('https://fiverr.com/'), group: 'Work' },
  producthunt: { label: 'Product Hunt', color: 'DA552F', logo: 'producthunt', placeholder: '@handle', href: asUrl('https://producthunt.com/@'), group: 'Work' },
  orcid: { label: 'ORCID', color: 'A6CE39', logo: 'orcid', placeholder: '0000-0000-0000-0000', href: asUrl('https://orcid.org/'), group: 'Work' },
  scholar: { label: 'Google Scholar', color: '4285F4', logo: 'googlescholar', placeholder: 'citation id', href: asUrl('https://scholar.google.com/citations?user='), group: 'Work' },
  researchgate: { label: 'ResearchGate', color: '00CCBB', logo: 'researchgate', placeholder: 'profile/Your-Name', href: asUrl('https://researchgate.net/'), group: 'Work' }
}

/** Order the picker lists groups in. */
const PLATFORM_GROUPS: PlatformGroup[] = ['Core', 'Code', 'Writing', 'Community', 'Creative', 'Work']

/**
 * Grouped option list for `USelectMenu`. Icons come from the same simple-icons
 * slug the badge uses, so the picker and the rendered badge can never drift.
 */
export const PLATFORM_OPTIONS = PLATFORM_GROUPS.flatMap(group =>
  (Object.entries(SOCIAL_PLATFORMS) as [SocialPlatform, PlatformDefinition][])
    .filter(([, definition]) => definition.group === group)
    .map(([value, definition]) => ({
      label: definition.label,
      value,
      group,
      icon: `i-simple-icons-${definition.logo}`
    }))
)
