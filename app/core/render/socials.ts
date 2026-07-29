import { SOCIAL_PLATFORMS } from '~/config/social-platforms'
import type { BlockRenderer } from '~/types'
import { badge, heading, imageRow } from './helpers'

export const renderSocials: BlockRenderer<'socials'> = ({
  heading: title,
  links,
  align: alignment,
  style,
  showLabels
}) => {
  const badges = links
    .filter(link => link.value.trim())
    .map((link) => {
      const platform = SOCIAL_PLATFORMS[link.platform]
      const name = link.label?.trim() || platform.label

      return badge({
        label: '',
        // A logo-only badge still needs a message, or shields has nothing to
        // draw; a single space collapses to just the mark.
        message: showLabels ? name : ' ',
        color: platform.color,
        logo: platform.logo,
        style,
        href: platform.href(link.value.trim()),
        alt: name
      })
    })

  if (!badges.length) return ''

  return heading(title) + imageRow(badges, alignment)
}
