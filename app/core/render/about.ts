import type { BlockRenderer } from '~/types'
import { heading } from './helpers'

export const renderAbout: BlockRenderer<'about'> = ({ heading: title, intro, bullets }) => {
  const list = bullets
    .map(bullet => bullet.trim())
    .filter(Boolean)
    .map(bullet => `- ${bullet}`)
    .join('\n')

  return heading(title) + [intro.trim(), list].filter(Boolean).join('\n\n')
}
