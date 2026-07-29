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
  sideBySide,
  langLayout,
  langsCount,
  showIcons,
  hideBorder,
  hideRank,
  includeAllCommits,
  borderRadius
}) => {
  const user = username.trim()
  if (!user) return ''

  /**
   * A fixed height is what actually makes two cards sit level on one row. The
   * donut and pie layouts draw taller than the compact list, so the row has to
   * grow with them or the languages card gets cropped.
   */
  const tallLayout = langLayout === 'donut' || langLayout === 'pie' || langLayout === 'donut-vertical'
  const rowHeight = tallLayout ? 200 : 165
  const height = sideBySide ? ` height="${rowHeight}"` : ''
  const card = (src: string, alt: string) => `<img${height} src="${src}" alt="${alt}" />`

  const shared = {
    theme,
    hide_border: hideBorder,
    border_radius: borderRadius
  }

  const cards: string[] = []

  if (showStats) {
    cards.push(card(
      `${SERVICES.stats}?${qs({
        username: user,
        ...shared,
        show_icons: showIcons,
        hide_rank: hideRank,
        include_all_commits: includeAllCommits
      })}`,
      'GitHub stats'
    ))
  }
  if (showTopLangs) {
    cards.push(card(
      `${SERVICES.topLangs}?${qs({
        username: user,
        ...shared,
        layout: langLayout,
        langs_count: langsCount
      })}`,
      'Top languages'
    ))
  }
  if (showStreak) {
    // The streak service takes `user`, not `username`, and spells its border
    // flag differently from github-readme-stats.
    cards.push(card(
      `${SERVICES.streak}?${qs({
        user,
        theme,
        hide_border: hideBorder,
        border_radius: borderRadius
      })}`,
      'Contribution streak'
    ))
  }

  if (!cards.length) return ''

  return heading(title) + `<p align="center">\n  ${cards.join('\n  ')}\n</p>`
}
