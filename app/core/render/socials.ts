import { SERVICES } from '~/config/services'
import { SOCIAL_PLATFORMS } from '~/config/social-platforms'
import type { BadgeStyle, BlockRenderer, SocialLink } from '~/types'
import { align, heading } from './helpers'

/** shields.io reads `-` and `_` as field separators, so they must be doubled. */
const escapeBadgeText = (text: string) => text.replace(/-/g, '--').replace(/_/g, '__')

function renderBadge(link: SocialLink, style: BadgeStyle): string {
  const platform = SOCIAL_PLATFORMS[link.platform]
  const badge = `${SERVICES.shields}/${escapeBadgeText(platform.label)}-${platform.color}`
    + `?style=${style}&logo=${platform.logo}&logoColor=white`

  return `<a href="${platform.href(link.value.trim())}" target="_blank">`
    + `<img src="${badge}" alt="${platform.label}" /></a>`
}

export const renderSocials: BlockRenderer<'socials'> = ({
  heading: title,
  links,
  align: alignment,
  style
}) => {
  const badges = links
    .filter(link => link.value.trim())
    .map(link => renderBadge(link, style))

  if (!badges.length) return ''

  return heading(title) + align(badges.join('\n  '), alignment, 'p')
}
