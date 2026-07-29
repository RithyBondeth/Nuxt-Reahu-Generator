import type { Alignment } from '~/types'

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
 * Wraps content in a centering element, or returns it untouched when
 * left-aligned. The blank lines are load-bearing: without them GitHub treats
 * the wrapper's contents as literal HTML instead of Markdown, and headings
 * inside it stop rendering.
 */
export const align = (content: string, alignment: Alignment, tag: 'div' | 'p' = 'div') =>
  alignment === 'center'
    ? `<${tag} align="center">\n\n${content}\n\n</${tag}>`
    : content

/** A section heading, or nothing at all when the title is blank. */
export const heading = (text: string) => (text.trim() ? `## ${text.trim()}\n\n` : '')
