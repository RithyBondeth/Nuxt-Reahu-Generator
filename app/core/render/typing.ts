import { SERVICES } from '~/config/services'
import type { BlockRenderer } from '~/types'
import { align, escapeHtml, hex, qs } from './helpers'

export const renderTyping: BlockRenderer<'typing'> = ({
  lines,
  font,
  size,
  weight,
  color,
  duration,
  pause,
  width,
  height,
  center,
  vCenter,
  multiline,
  repeat,
  align: alignment
}) => {
  /**
   * The service splits `lines` on `;`, so a semicolon the user typed would cut
   * their sentence in half. Swapping it for a comma keeps the line intact and
   * reads naturally, which is better than silently dropping half of it.
   */
  const text = lines
    .map(line => line.trim().replace(/;/g, ','))
    .filter(Boolean)
    .join(';')

  if (!text) return ''

  const url = `${SERVICES.typing}?${qs({
    font,
    size,
    weight,
    duration,
    pause,
    color: hex(color),
    center,
    vCenter,
    multiline,
    repeat,
    width,
    height,
    lines: text
  })}`

  const img = `<img src="${url}" alt="${escapeHtml(
    lines.map(line => line.trim()).filter(Boolean).join(' · ')
  )}" />`

  return align(img, alignment, 'p')
}
