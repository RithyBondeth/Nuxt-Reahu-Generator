import type { SupportPlatform } from '~/types'

export interface SupportDefinition {
  label: string
  /** shields.io badge background, hex without the leading `#`. */
  color: string
  /** simple-icons slug. */
  logo: string
  /** Badge text. Sponsor buttons read better as a call to action than a name. */
  message: string
  placeholder: string
  href: (value: string) => string
}

const asUrl = (base: string) => (value: string) =>
  /^https?:\/\//i.test(value) ? value : `${base}${value.replace(/^@/, '')}`

export const SUPPORT_PLATFORMS: Record<SupportPlatform, SupportDefinition> = {
  buymeacoffee: {
    label: 'Buy Me a Coffee',
    color: 'FFDD00',
    logo: 'buymeacoffee',
    message: 'Buy me a coffee',
    placeholder: 'username',
    href: asUrl('https://buymeacoffee.com/')
  },
  kofi: {
    label: 'Ko-fi',
    color: 'FF5E5B',
    logo: 'kofi',
    message: 'Support me',
    placeholder: 'username',
    href: asUrl('https://ko-fi.com/')
  },
  patreon: {
    label: 'Patreon',
    color: 'FF424D',
    logo: 'patreon',
    message: 'Become a patron',
    placeholder: 'username',
    href: asUrl('https://patreon.com/')
  },
  githubsponsors: {
    label: 'GitHub Sponsors',
    color: 'EA4AAA',
    logo: 'githubsponsors',
    message: 'Sponsor',
    placeholder: 'username',
    href: asUrl('https://github.com/sponsors/')
  },
  paypal: {
    label: 'PayPal',
    color: '00457C',
    logo: 'paypal',
    message: 'Donate',
    placeholder: 'username',
    href: asUrl('https://paypal.me/')
  },
  opencollective: {
    label: 'Open Collective',
    color: '7FADF2',
    logo: 'opencollective',
    message: 'Back this project',
    placeholder: 'collective',
    href: asUrl('https://opencollective.com/')
  },
  liberapay: {
    label: 'Liberapay',
    color: 'F6C915',
    logo: 'liberapay',
    message: 'Donate',
    placeholder: 'username',
    href: asUrl('https://liberapay.com/')
  }
}

export const SUPPORT_OPTIONS = (
  Object.entries(SUPPORT_PLATFORMS) as [SupportPlatform, SupportDefinition][]
).map(([value, definition]) => ({
  label: definition.label,
  value,
  icon: `i-simple-icons-${definition.logo}`
}))
