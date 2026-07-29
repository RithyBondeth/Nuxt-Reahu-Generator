import type { BannerAnimation, BannerShape, ColorMode, DividerStyle, TrophyTitle, TypingFont } from '~/types'

/**
 * Option catalogues for the decorative widget blocks — banner, typing, trophy,
 * divider, quote.
 *
 * These are presentation choices rather than data, so each option carries the
 * copy the editor shows. Keeping label and value together means the picker and
 * the renderer can never disagree about what a value means.
 */

/** capsule-render shapes, in the order the picker shows them. */
export const BANNER_SHAPES: { label: string, value: BannerShape, hint: string }[] = [
  { label: 'Waving', value: 'waving', hint: 'The classic animated crest' },
  { label: 'Wave', value: 'wave', hint: 'A single soft swell' },
  { label: 'Rect', value: 'rect', hint: 'Flat block, no curve' },
  { label: 'Soft', value: 'soft', hint: 'Gently rounded base' },
  { label: 'Slice', value: 'slice', hint: 'Diagonal cut' },
  { label: 'Blur slice', value: 'blur-slice', hint: 'Diagonal cut, softened' },
  { label: 'Cylinder', value: 'cylinder', hint: 'Curved top and bottom' },
  { label: 'Egg', value: 'egg', hint: 'Wide dome' },
  { label: 'Shark', value: 'shark', hint: 'Angled fin' },
  { label: 'Venom', value: 'venom', hint: 'Dripping edge' },
  { label: 'Speech', value: 'speech', hint: 'Speech-bubble tail' },
  { label: 'Rounded', value: 'rounded', hint: 'Rounded corners' },
  { label: 'Blur', value: 'blur', hint: 'Soft-focus wash' },
  { label: 'Transparent', value: 'transparent', hint: 'Text only, no fill' }
]

export const BANNER_ANIMATIONS: { label: string, value: BannerAnimation }[] = [
  { label: 'None', value: 'none' },
  { label: 'Fade in', value: 'fadeIn' },
  { label: 'Twinkling', value: 'twinkling' },
  { label: 'Blinking', value: 'blinking' },
  { label: 'Scale in', value: 'scaleIn' }
]

export const COLOR_MODE_OPTIONS: { label: string, value: ColorMode, hint: string }[] = [
  { label: 'Gradient', value: 'gradient', hint: 'Blend two colours' },
  { label: 'Solid', value: 'solid', hint: 'One flat colour' },
  { label: 'Auto', value: 'auto', hint: 'Shifts with the time of day' }
]

/**
 * Fonts readme-typing-svg resolves through Google Fonts.
 *
 * Stored as the real font name so the query encoder can turn the space into
 * `%20` on its own — see the note on `TypingFont`. The label and the value are
 * the same string, which is the point: there is no transport form to keep in
 * sync with a display form.
 */
const TYPING_FONT_NAMES: TypingFont[] = [
  'Fira Code',
  'JetBrains Mono',
  'Roboto Mono',
  'Source Code Pro',
  'IBM Plex Mono',
  'Space Mono',
  'Inconsolata',
  'Ubuntu Mono',
  'Inter',
  'Poppins',
  'Montserrat',
  'Playfair Display',
  'Noto Sans'
]

export const TYPING_FONTS = TYPING_FONT_NAMES.map(font => ({ label: font, value: font }))

/**
 * Trophy categories. Values are the upstream `title` strings verbatim — the
 * service ignores a filter it does not recognise and quietly returns every
 * trophy, so a friendly-looking rename here would break the filter silently.
 */
export const TROPHY_TITLES: { label: string, value: TrophyTitle }[] = [
  { label: 'Stars', value: 'Stars' },
  { label: 'Commits', value: 'Commits' },
  { label: 'Followers', value: 'Followers' },
  { label: 'Issues', value: 'Issues' },
  { label: 'Pull requests', value: 'PullRequest' },
  { label: 'Repositories', value: 'Repositories' },
  { label: 'Reviews', value: 'Reviews' },
  { label: 'Experience', value: 'Experience' },
  { label: 'Languages', value: 'MultiLanguage' },
  { label: 'Organizations', value: 'Organizations' },
  { label: 'Long-time user', value: 'LongTimeUser' },
  { label: 'Ancient user', value: 'AncientUser' },
  { label: 'OG user', value: 'OGUser' },
  { label: 'Joined 2020', value: 'Joined2020' },
  { label: 'All S rank', value: 'AllSuperRank' }
]

export const DIVIDER_STYLES: { label: string, value: DividerStyle, hint: string }[] = [
  { label: 'Gradient bar', value: 'gradient', hint: 'A thin coloured rule' },
  { label: 'Wave', value: 'wave', hint: 'A shallow crest' },
  { label: 'Glow', value: 'glow', hint: 'Soft blurred band' },
  { label: 'Plain rule', value: 'rule', hint: 'Markdown `---`' },
  { label: 'Blank space', value: 'blank', hint: 'Breathing room only' }
]

export const QUOTE_LAYOUT_OPTIONS: { label: string, value: 'horizontal' | 'vertical' }[] = [
  { label: 'Horizontal', value: 'horizontal' },
  { label: 'Vertical', value: 'vertical' }
]
