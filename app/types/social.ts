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
    | 'medium'
    | 'devto'
    | 'website'
    | 'email'

export interface SocialLink {
  platform: SocialPlatform
  /** Username, handle, or full URL depending on the platform. */
  value: string
}

/** Badge rendering styles supported by shields.io. */
export type BadgeStyle = 'for-the-badge' | 'flat-square' | 'flat'
