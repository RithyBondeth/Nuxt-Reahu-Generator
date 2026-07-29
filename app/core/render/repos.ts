import { SERVICES } from '~/config/services'
import type { BlockRenderer } from '~/types'
import { align, escapeHtml, heading, qs } from './helpers'

export const renderRepos: BlockRenderer<'repos'> = ({
  heading: title,
  username,
  repos,
  theme,
  perRow,
  showOwner,
  hideBorder,
  borderRadius,
  align: alignment
}) => {
  const user = username.trim()

  // An entry may name another owner's repo as `owner/repo`; a bare name belongs
  // to the block's own user. Either way both halves have to be present.
  const pins = repos
    .map(entry => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [owner, repo] = entry.includes('/') ? entry.split('/') : [user, entry]
      return { owner: owner?.trim() ?? '', repo: repo?.trim() ?? '' }
    })
    .filter(({ owner, repo }) => owner && repo)

  if (!pins.length) return ''

  const cards = pins.map(({ owner, repo }) => {
    const url = `${SERVICES.pin}?${qs({
      username: owner,
      repo,
      theme,
      show_owner: showOwner,
      hide_border: hideBorder,
      border_radius: borderRadius
    })}`

    return `<a href="https://github.com/${owner}/${repo}" target="_blank">`
      + `<img src="${url}" alt="${escapeHtml(`${owner}/${repo}`)}" /></a>`
  })

  // Chunked into rows rather than left to wrap, so the grid stays even and the
  // Markdown source shows the same shape the reader will see.
  const rows: string[] = []
  for (let index = 0; index < cards.length; index += perRow) {
    rows.push(cards.slice(index, index + perRow).join('\n  '))
  }

  return heading(title) + rows.map(row => align(row, alignment, 'p')).join('\n')
}
