import { SUPPORT_PLATFORMS } from '~/config/support-platforms'
import type { BlockRenderer } from '~/types'
import { align, badge, heading, imageRow } from './helpers'

export const renderSupport: BlockRenderer<'support'> = ({
  heading: title,
  text,
  links,
  style,
  align: alignment
}) => {
  const buttons = links
    .filter(link => link.value.trim())
    .map((link) => {
      const platform = SUPPORT_PLATFORMS[link.platform]

      return badge({
        label: '',
        message: platform.message,
        color: platform.color,
        logo: platform.logo,
        style,
        href: platform.href(link.value.trim()),
        alt: platform.label
      })
    })

  if (!buttons.length) return ''

  const intro = text.trim() ? align(text.trim(), alignment) : ''

  return heading(title) + [intro, imageRow(buttons, alignment)].filter(Boolean).join('\n\n')
}
