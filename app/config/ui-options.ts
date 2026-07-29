import type { Alignment, BadgeStyle } from '~/types'

/**
 * Select options reused across several block editors. Kept here so the labels
 * stay consistent and a new alignment or badge style is added in one place.
 */

export const ALIGNMENT_OPTIONS: { label: string, value: Alignment }[] = [
  { label: 'Center', value: 'center' },
  { label: 'Left', value: 'left' }
]

export const BADGE_STYLE_OPTIONS: { label: string, value: BadgeStyle }[] = [
  { label: 'For the badge', value: 'for-the-badge' },
  { label: 'Flat square', value: 'flat-square' },
  { label: 'Flat', value: 'flat' }
]

export const ICON_THEME_OPTIONS: { label: string, value: 'dark' | 'light' }[] = [
  { label: 'Dark', value: 'dark' },
  { label: 'Light', value: 'light' }
]
