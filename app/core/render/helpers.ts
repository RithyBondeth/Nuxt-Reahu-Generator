import { SERVICES } from '~/config/services'
import type { Alignment, BadgeStyle } from '~/types'

/**
 * Markdown-assembly primitives shared by every renderer.
 *
 * Centering and side-by-side images use the small subset of raw HTML that
 * GitHub allows inside Markdown (`<div align>`, `<p align>`, `<img>`,
 * `<picture>`). Anything outside that subset is stripped by GitHub silently, so
 * keep additions conservative.
 */

/** Builds a query string, dropping empty values. */
export const qs = (params: Record<string, string | number | boolean | undefined>) =>
  Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== '')
    // Commas are legal sub-delimiters in a query string, and these URLs end up
    // in a file people read. `i=ts,vue` beats `i=ts%2Cvue`.
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value)).replace(/%2C/g, ',')}`)
    .join('&')

/**
 * Wraps content in an aligning element, or returns it untouched when
 * left-aligned. The blank lines are load-bearing: without them GitHub treats
 * the wrapper's contents as literal HTML instead of Markdown, and headings
 * inside it stop rendering.
 */
export const align = (content: string, alignment: Alignment, tag: 'div' | 'p' = 'div') =>
  alignment === 'left'
    ? content
    : `<${tag} align="${alignment}">\n\n${content}\n\n</${tag}>`

/** A section heading, or nothing at all when the title is blank. */
export const heading = (text: string) => (text.trim() ? `## ${text.trim()}\n\n` : '')

/** Strips a leading `#`, so a colour is always in the form the services want. */
export const hex = (value: string) => value.trim().replace(/^#/, '')

/**
 * Escapes text that lands inside an HTML attribute.
 *
 * Renderer output is Markdown the user downloads, but it also goes straight to
 * the live preview, so an unescaped quote in a URL or in alt text would break
 * out of its attribute. DOMPurify catches anything dangerous downstream; this
 * keeps the markup correct in the first place.
 */
export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/**
 * shields.io reads `-`, `_`, and space as field separators in the path form of
 * a badge, so each has to be doubled or percent-encoded before it goes in.
 */
export const escapeBadgeText = (text: string) =>
  text.replace(/-/g, '--').replace(/_/g, '__').replace(/ /g, '%20')

/**
 * A shields.io badge as an `<img>`, wrapped in a link when one is given.
 *
 * `logoColor` is forced to white for every style but `social`, which draws a
 * pale badge that a white logo would vanish into.
 */
export function badge(options: {
  label: string
  message: string
  color: string
  style: BadgeStyle
  logo?: string
  href?: string
  alt?: string
}): string {
  const { label, message, color, style, logo, href, alt } = options

  const path = label.trim()
    ? `${escapeBadgeText(label.trim())}-${escapeBadgeText(message.trim())}-${hex(color)}`
    : `${escapeBadgeText(message.trim())}-${hex(color)}`

  const query = qs({
    style,
    logo: logo?.trim(),
    logoColor: logo?.trim() && style !== 'social' ? 'white' : undefined
  })

  const src = `${SERVICES.shields}/${path}${query ? `?${query}` : ''}`
  const img = `<img src="${src}" alt="${escapeHtml(alt ?? message)}" />`

  return href?.trim()
    ? `<a href="${escapeHtml(href.trim())}" target="_blank">${img}</a>`
    : img
}

/**
 * Puts images on one aligned line. The two-space indent is what keeps the
 * source readable once a block holds six badges.
 */
export const imageRow = (images: string[], alignment: Alignment) =>
  align(images.join('\n  '), alignment, 'p')
