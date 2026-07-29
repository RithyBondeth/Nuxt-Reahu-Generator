import { SERVICES } from '~/config/services'
import type { BlockRenderer } from '~/types'
import { align, escapeHtml, heading, qs } from './helpers'

export const renderActivity: BlockRenderer<'activity'> = ({
  heading: title,
  username,
  theme,
  days,
  height,
  area,
  radius,
  hideBorder,
  hideTitle,
  customTitle,
  align: alignment
}) => {
  const user = username.trim()
  if (!user) return ''

  const url = `${SERVICES.activity}?${qs({
    username: user,
    theme,
    days,
    height,
    area,
    radius,
    hide_border: hideBorder,
    hide_title: hideTitle,
    custom_title: hideTitle ? undefined : customTitle.trim()
  })}`

  const img = `<img src="${url}" width="100%" alt="${escapeHtml(`${user}'s contribution graph`)}" />`

  return heading(title) + align(img, alignment, 'p')
}
