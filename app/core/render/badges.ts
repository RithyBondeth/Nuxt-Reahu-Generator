import type { BlockRenderer } from '~/types'
import { badge, heading, imageRow } from './helpers'

export const renderBadges: BlockRenderer<'badges'> = ({
  heading: title,
  items,
  style,
  align: alignment
}) => {
  const badges = items
    .filter(item => item.message.trim())
    .map(item => badge({
      label: item.label,
      message: item.message,
      color: item.color,
      logo: item.logo,
      style,
      href: item.href,
      alt: [item.label.trim(), item.message.trim()].filter(Boolean).join(': ')
    }))

  if (!badges.length) return ''

  return heading(title) + imageRow(badges, alignment)
}
