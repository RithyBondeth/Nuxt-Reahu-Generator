import { SERVICES } from '~/config/services'
import type { BlockRenderer } from '~/types'
import { align, heading, qs } from './helpers'

export const renderTechStack: BlockRenderer<'techStack'> = ({
  heading: title,
  icons,
  perLine,
  theme,
  align: alignment
}) => {
  // An unconfigured block contributes nothing rather than a dangling heading —
  // the downloaded file should never contain an empty section.
  if (!icons.length) return ''

  const url = `${SERVICES.skillIcons}?${qs({ i: icons.join(','), theme, perline: perLine })}`

  return heading(title) + align(`<img src="${url}" alt="Tech stack" />`, alignment, 'p')
}
