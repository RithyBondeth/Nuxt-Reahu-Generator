import { SERVICES } from '~/config/services'
import type { BlockRenderer } from '~/types'
import { align, qs } from './helpers'

export const renderHeader: BlockRenderer<'header'> = ({
  name,
  tagline,
  align: alignment,
  bannerUrl,
  showVisitorBadge,
  username
}) => {
  const parts: string[] = []

  if (bannerUrl.trim()) {
    parts.push(`<img src="${bannerUrl.trim()}" alt="banner" width="100%" />`)
  }
  if (name.trim()) {
    parts.push(`# ${name.trim()}`)
  }
  if (tagline.trim()) {
    parts.push(`### ${tagline.trim()}`)
  }
  if (showVisitorBadge && username.trim()) {
    const url = `${SERVICES.visitors}?${qs({
      username: username.trim(),
      style: 'flat-square',
      color: 'blue',
      label: 'Profile+views'
    })}`
    parts.push(`![Profile views](${url})`)
  }

  return align(parts.join('\n\n'), alignment)
}
