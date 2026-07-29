import { SERVICES } from '~/config/services'
import type { BlockPropsMap, BlockRenderer, ColorMode } from '~/types'
import { hex, qs } from './helpers'

/**
 * capsule-render takes its colour in three different shapes depending on what
 * you want, and they are not interchangeable:
 *
 * - a bare hex for a flat fill
 * - `0:hex,100:hex` for a two-stop gradient
 * - the literal `timeGradient`, which picks a palette from the viewer's clock
 */
export function bannerColor(mode: ColorMode, from: string, to: string): string {
  if (mode === 'auto') return 'timeGradient'
  if (mode === 'solid') return hex(from)
  return `0:${hex(from)},100:${hex(to)}`
}

export const renderBanner: BlockRenderer<'banner'> = ({
  shape,
  text,
  subtext,
  colorMode,
  colorFrom,
  colorTo,
  height,
  fontSize,
  fontColor,
  fontAlign,
  fontAlignY,
  animation,
  section,
  reversal
}) => {
  const url = `${SERVICES.capsule}?${qs({
    type: shape,
    color: bannerColor(colorMode, colorFrom, colorTo),
    height,
    section,
    reversal: reversal || undefined,
    text: text.trim(),
    fontSize: text.trim() ? fontSize : undefined,
    fontColor: text.trim() ? hex(fontColor) : undefined,
    fontAlign: text.trim() ? fontAlign : undefined,
    fontAlignY: text.trim() ? fontAlignY : undefined,
    desc: subtext.trim(),
    descAlign: subtext.trim() ? fontAlign : undefined,
    descAlignY: subtext.trim() ? Math.min(fontAlignY + 18, 100) : undefined,
    animation: animation === 'none' ? undefined : animation
  })}`

  // A full-bleed banner is the one place a bare <img> beats a Markdown image:
  // it needs `width="100%"` to span the README column on every screen.
  return `<img src="${url}" width="100%" alt="${
    text.trim() ? text.trim().replace(/"/g, '&quot;') : 'banner'
  }" />`
}

/** Shared with the divider block, which draws the same service at low height. */
export type BannerProps = BlockPropsMap['banner']
