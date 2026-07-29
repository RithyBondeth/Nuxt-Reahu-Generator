/**
 * Types for the decorative and animated widgets — the blocks whose output is an
 * SVG rendered by a third-party service rather than plain Markdown.
 *
 * Each union mirrors the values one specific service accepts. They are kept
 * apart rather than merged into one "style" type because the services do not
 * agree on names, and a shared union would let an invalid value through.
 */

/** capsule-render shapes. */
export type BannerShape
  = | 'waving'
    | 'wave'
    | 'rect'
    | 'soft'
    | 'slice'
    | 'cylinder'
    | 'egg'
    | 'shark'
    | 'blur'
    | 'blur-slice'
    | 'rounded'
    | 'transparent'
    | 'venom'
    | 'speech'

/**
 * capsule-render text entrances.
 *
 * "No animation" is the string `none`, not an empty string: the select these
 * feed refuses an empty value, because it reserves that for clearing the field
 * and showing the placeholder. The renderer drops `none` from the query.
 */
export type BannerAnimation = 'none' | 'fadeIn' | 'twinkling' | 'blinking' | 'scaleIn'

/** How a banner or divider picks its colours. */
export type ColorMode = 'gradient' | 'solid' | 'auto'

/**
 * Fonts readme-typing-svg resolves from Google Fonts.
 *
 * Spelled with real spaces, not the `Fira+Code` form the service's own docs
 * use. Both reach it as a space, but only if the encoding is left alone —
 * percent-encoding a literal `+` yields `%2B`, which arrives as a plus sign,
 * fails to match any Google font, and returns a card with no text in it.
 */
export type TypingFont
  = | 'Fira Code'
    | 'JetBrains Mono'
    | 'Roboto Mono'
    | 'Source Code Pro'
    | 'IBM Plex Mono'
    | 'Space Mono'
    | 'Inconsolata'
    | 'Ubuntu Mono'
    | 'Poppins'
    | 'Inter'
    | 'Montserrat'
    | 'Playfair Display'
    | 'Noto Sans'

/** Shapes a divider block can draw. */
export type DividerStyle = 'gradient' | 'wave' | 'rule' | 'glow' | 'blank'

/** Column alignment in a Markdown table. */
export type ColumnAlign = 'left' | 'center' | 'right'

/** Which icon service draws the tech-stack grid. */
export type IconProvider = 'skillicons' | 'badges'
