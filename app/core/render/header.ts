import { SERVICES } from '~/config/services'
import type { BlockRenderer } from '~/types'
import { align, escapeHtml, hex, qs } from './helpers'

export const renderHeader: BlockRenderer<'header'> = ({
  name,
  tagline,
  align: alignment,
  bannerUrl,
  username,
  showVisitorBadge,
  showFollowers,
  showStars,
  badgeStyle,
  badgeColor
}) => {
  const parts: string[] = []
  const user = username.trim()

  if (bannerUrl.trim()) {
    parts.push(`<img src="${escapeHtml(bannerUrl.trim())}" alt="banner" width="100%" />`)
  }
  if (name.trim()) {
    parts.push(`# ${name.trim()}`)
  }
  if (tagline.trim()) {
    parts.push(`### ${tagline.trim()}`)
  }

  /**
   * The counters are live data from two different services — komarev counts
   * profile views, shields reads the GitHub API for followers and stars. They
   * render on one line so the header keeps a single rhythm however many are on.
   */
  const counters: string[] = []

  if (user && showVisitorBadge) {
    counters.push(`<img src="${SERVICES.visitors}?${qs({
      username: user,
      style: badgeStyle,
      color: hex(badgeColor),
      label: 'Profile views'
    })}" alt="Profile views" />`)
  }
  if (user && showFollowers) {
    counters.push(`<img src="${SERVICES.shieldsRoot}/github/followers/${user}?${qs({
      label: 'Followers',
      style: badgeStyle,
      color: hex(badgeColor),
      logo: 'github',
      logoColor: 'white'
    })}" alt="GitHub followers" />`)
  }
  if (user && showStars) {
    counters.push(`<img src="${SERVICES.shieldsRoot}/github/stars/${user}?${qs({
      affiliations: 'OWNER',
      label: 'Stars',
      style: badgeStyle,
      color: hex(badgeColor),
      logo: 'github',
      logoColor: 'white'
    })}" alt="GitHub stars" />`)
  }

  if (counters.length) parts.push(counters.join('\n  '))
  if (!parts.length) return ''

  return align(parts.join('\n\n'), alignment)
}
