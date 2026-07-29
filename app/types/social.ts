export type SocialPlatform
  = | 'github'
    | 'linkedin'
    | 'x'
    | 'instagram'
    | 'youtube'
    | 'telegram'
    | 'discord'
    | 'facebook'
    | 'dribbble'
    | 'behance'
    | 'medium'
    | 'devto'
    | 'hashnode'
    | 'substack'
    | 'stackoverflow'
    | 'reddit'
    | 'twitch'
    | 'codepen'
    | 'kaggle'
    | 'leetcode'
    | 'hackerrank'
    | 'codeforces'
    | 'gitlab'
    | 'bitbucket'
    | 'mastodon'
    | 'bluesky'
    | 'threads'
    | 'tiktok'
    | 'whatsapp'
    | 'pinterest'
    | 'soundcloud'
    | 'spotify'
    | 'steam'
    | 'itch'
    | 'npm'
    | 'pypi'
    | 'dockerhub'
    | 'huggingface'
    | 'orcid'
    | 'scholar'
    | 'researchgate'
    | 'notion'
    | 'figma'
    | 'vimeo'
    | 'calendly'
    | 'upwork'
    | 'fiverr'
    | 'producthunt'
    | 'rss'
    | 'website'
    | 'email'

export interface SocialLink {
  platform: SocialPlatform
  /** Username, handle, or full URL depending on the platform. */
  value: string
  /** Overrides the platform's own name on the badge. Blank means "use it". */
  label?: string
}

/** Badge rendering styles supported by shields.io. */
export type BadgeStyle = 'for-the-badge' | 'flat-square' | 'flat' | 'plastic' | 'social'

/** A free-form shields.io badge, assembled field by field. */
export interface BadgeItem {
  /** Grey left half. Blank renders a single-part badge. */
  label: string
  /** Coloured right half. */
  message: string
  /** Hex without the leading `#`. */
  color: string
  /** simple-icons slug, or blank for no logo. */
  logo: string
  /** Wraps the badge in a link when set. */
  href: string
}

export type SupportPlatform
  = | 'buymeacoffee'
    | 'kofi'
    | 'patreon'
    | 'githubsponsors'
    | 'paypal'
    | 'opencollective'
    | 'liberapay'

export interface SupportLink {
  platform: SupportPlatform
  value: string
}
