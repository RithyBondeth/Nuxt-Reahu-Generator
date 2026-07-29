import type { Alignment, BadgeStyle, ColumnAlign, IconProvider, LangLayout } from '~/types'

/**
 * Select options reused across several block editors. Kept here so the labels
 * stay consistent and a new alignment or badge style is added in one place.
 */

export const ALIGNMENT_OPTIONS: { label: string, value: Alignment, icon: string }[] = [
  { label: 'Left', value: 'left', icon: 'i-lucide-align-left' },
  { label: 'Center', value: 'center', icon: 'i-lucide-align-center' },
  { label: 'Right', value: 'right', icon: 'i-lucide-align-right' }
]

export const BADGE_STYLE_OPTIONS: { label: string, value: BadgeStyle }[] = [
  { label: 'For the badge', value: 'for-the-badge' },
  { label: 'Flat square', value: 'flat-square' },
  { label: 'Flat', value: 'flat' },
  { label: 'Plastic', value: 'plastic' },
  { label: 'Social', value: 'social' }
]

export const ICON_THEME_OPTIONS: { label: string, value: 'dark' | 'light' }[] = [
  { label: 'Dark', value: 'dark' },
  { label: 'Light', value: 'light' }
]

export const ICON_PROVIDER_OPTIONS: { label: string, value: IconProvider, hint: string }[] = [
  { label: 'Icon grid', value: 'skillicons', hint: 'One compact sprite sheet' },
  { label: 'Badges', value: 'badges', hint: 'A labelled badge per tool' }
]

/** Which chart the top-languages card draws. */
export const LANG_LAYOUT_OPTIONS: { label: string, value: LangLayout, icon: string }[] = [
  { label: 'Compact', value: 'compact', icon: 'i-lucide-align-justify' },
  { label: 'Bars', value: 'normal', icon: 'i-lucide-bar-chart-3' },
  { label: 'Donut', value: 'donut', icon: 'i-lucide-circle-dot' },
  { label: 'Donut column', value: 'donut-vertical', icon: 'i-lucide-circle-dashed' },
  { label: 'Pie', value: 'pie', icon: 'i-lucide-pie-chart' }
]

export const COLUMN_ALIGN_OPTIONS: { label: string, value: ColumnAlign, icon: string }[] = [
  { label: 'Left', value: 'left', icon: 'i-lucide-align-left' },
  { label: 'Center', value: 'center', icon: 'i-lucide-align-center' },
  { label: 'Right', value: 'right', icon: 'i-lucide-align-right' }
]

/**
 * The brand ramp, offered wherever a block takes a colour. Hex without `#`
 * because that is the form every badge and card service wants.
 */
export const BRAND_SWATCHES: { label: string, value: string }[] = [
  { label: 'Reahu lime', value: 'C5F74F' },
  { label: 'Deep lime', value: '83AB2D' },
  { label: 'Graphite', value: '1C1C1C' },
  { label: 'Emerald', value: '10B981' },
  { label: 'Amber', value: 'F59E0B' },
  { label: 'Rose', value: 'F43F5E' },
  { label: 'Slate', value: '707070' },
  { label: 'Black', value: '000000' },
  { label: 'White', value: 'FFFFFF' }
]
