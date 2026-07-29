import type { SocialPlatform } from '~/types'

export interface PlatformDefinition {
  label: string
  /** shields.io badge background, hex without the leading `#`. */
  color: string
  /** simple-icons slug used as the badge logo. */
  logo: string
  placeholder: string
  /** Turns whatever the user typed into a full href. */
  href: (value: string) => string
}

/** Accepts either a bare handle or an already-complete URL. */
const asUrl = (base: string) => (value: string) =>
  /^https?:\/\//i.test(value) ? value : `${base}${value.replace(/^@/, '')}`

export const SOCIAL_PLATFORMS: Record<SocialPlatform, PlatformDefinition> = {
  github: { label: 'GitHub', color: '181717', logo: 'github', placeholder: 'username', href: asUrl('https://github.com/') },
  linkedin: { label: 'LinkedIn', color: '0A66C2', logo: 'linkedin', placeholder: 'in/username', href: asUrl('https://linkedin.com/') },
  x: { label: 'X', color: '000000', logo: 'x', placeholder: '@handle', href: asUrl('https://x.com/') },
  instagram: { label: 'Instagram', color: 'E4405F', logo: 'instagram', placeholder: '@handle', href: asUrl('https://instagram.com/') },
  youtube: { label: 'YouTube', color: 'FF0000', logo: 'youtube', placeholder: '@channel', href: asUrl('https://youtube.com/') },
  telegram: { label: 'Telegram', color: '26A5E4', logo: 'telegram', placeholder: '@handle', href: asUrl('https://t.me/') },
  discord: { label: 'Discord', color: '5865F2', logo: 'discord', placeholder: 'invite code', href: asUrl('https://discord.gg/') },
  facebook: { label: 'Facebook', color: '1877F2', logo: 'facebook', placeholder: 'username', href: asUrl('https://facebook.com/') },
  dribbble: { label: 'Dribbble', color: 'EA4C89', logo: 'dribbble', placeholder: 'username', href: asUrl('https://dribbble.com/') },
  medium: { label: 'Medium', color: '000000', logo: 'medium', placeholder: '@handle', href: asUrl('https://medium.com/@') },
  devto: { label: 'DEV', color: '0A0A0A', logo: 'devdotto', placeholder: 'username', href: asUrl('https://dev.to/') },
  website: { label: 'Portfolio', color: '4285F4', logo: 'googlechrome', placeholder: 'https://you.dev', href: asUrl('https://') },
  email: { label: 'Email', color: 'EA4335', logo: 'gmail', placeholder: 'you@mail.com', href: value => `mailto:${value}` }
}
