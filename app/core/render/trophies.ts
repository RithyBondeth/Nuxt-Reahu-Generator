import { SERVICES } from '~/config/services'
import type { BlockRenderer } from '~/types'
import { align, escapeHtml, heading, qs } from './helpers'

export const renderTrophies: BlockRenderer<'trophies'> = ({
  heading: title,
  username,
  theme,
  titles,
  column,
  row,
  marginW,
  marginH,
  noFrame,
  noBackground,
  align: alignment
}) => {
  const user = username.trim()
  if (!user) return ''

  /**
   * An empty filter means "every trophy". Sending `title=` explicitly does not:
   * the service matches the empty string against nothing and returns a blank
   * card, so the parameter has to be left off entirely instead.
   */
  const url = `${SERVICES.trophy}?${qs({
    'username': user,
    theme,
    'title': titles.length ? titles.join(',') : undefined,
    column,
    row,
    'margin-w': marginW,
    'margin-h': marginH,
    'no-frame': noFrame || undefined,
    'no-bg': noBackground || undefined
  })}`

  const img = `<a href="https://github.com/ryo-ma/github-profile-trophy" target="_blank">`
    + `<img src="${url}" alt="${escapeHtml(`${user}'s GitHub trophies`)}" /></a>`

  return heading(title) + align(img, alignment, 'p')
}
