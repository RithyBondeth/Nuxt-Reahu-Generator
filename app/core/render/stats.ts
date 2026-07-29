import { SERVICES } from '~/config/services'
import type { BlockRenderer } from '~/types'
import { heading, qs } from './helpers'

export const renderStats: BlockRenderer<'stats'> = ({
  heading: title,
  username,
  theme,
  showStats,
  showStreak,
  showTopLangs,
  sideBySide
}) => {
  const user = username.trim()
  if (!user) return ''

  // A fixed height is what actually makes two cards sit level on one row.
  const height = sideBySide ? ' height="165"' : ''
  const card = (src: string, alt: string) => `<img${height} src="${src}" alt="${alt}" />`

  const cards: string[] = []

  if (showStats) {
    cards.push(card(
      `${SERVICES.stats}?${qs({ username: user, theme, show_icons: true, hide_border: true, include_all_commits: true })}`,
      'GitHub stats'
    ))
  }
  if (showTopLangs) {
    cards.push(card(
      `${SERVICES.topLangs}?${qs({ username: user, theme, layout: 'compact', hide_border: true })}`,
      'Top languages'
    ))
  }
  if (showStreak) {
    cards.push(card(
      `${SERVICES.streak}?${qs({ user, theme, hide_border: true })}`,
      'Streak'
    ))
  }

  if (!cards.length) return ''

  return heading(title) + `<p align="center">\n  ${cards.join('\n  ')}\n</p>`
}
