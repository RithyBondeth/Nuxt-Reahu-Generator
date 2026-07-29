import type { BlockRenderer } from '~/types'
import { align, heading } from './helpers'

export const renderAbout: BlockRenderer<'about'> = ({
  heading: title,
  intro,
  bullets,
  quote,
  align: alignment
}) => {
  const list = bullets
    .map(bullet => bullet.trim())
    .filter(Boolean)
    .map(bullet => `- ${bullet}`)
    .join('\n')

  const pull = quote.trim() ? `> ${quote.trim()}` : ''

  const body = [intro.trim(), list, pull].filter(Boolean).join('\n\n')
  if (!body) return ''

  return heading(title) + align(body, alignment)
}
