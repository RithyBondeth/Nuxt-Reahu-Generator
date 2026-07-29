import { SERVICES } from '~/config/services'
import type { BlockRenderer } from '~/types'
import { qs } from './helpers'
import { bannerColor } from './banner'

/** Which capsule-render shape each decorative style maps to. */
const SHAPES = {
  gradient: 'rect',
  wave: 'waving',
  glow: 'blur'
} as const

export const renderDivider: BlockRenderer<'divider'> = ({
  style,
  height,
  colorMode,
  colorFrom,
  colorTo
}) => {
  if (style === 'rule') return '---'

  // `<br />` rather than a blank line: consecutive newlines collapse in
  // Markdown, so an empty paragraph is the only way to hold vertical space.
  if (style === 'blank') return '<br />'

  const url = `${SERVICES.capsule}?${qs({
    type: SHAPES[style],
    color: bannerColor(colorMode, colorFrom, colorTo),
    height,
    section: 'header'
  })}`

  return `<img src="${url}" width="100%" alt="" />`
}
