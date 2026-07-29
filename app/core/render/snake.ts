import { SNAKE_OUTPUT } from '~/config/services'
import type { BlockRenderer } from '~/types'
import { align, escapeHtml } from './helpers'

/**
 * The contribution snake.
 *
 * Unlike every other widget here this one is not a live service: a GitHub
 * Action running in the user's own profile repo renders the SVG on a schedule
 * and commits it to a branch, and this block only points at the result. Until
 * that workflow has run at least once the image is a 404 — which is why
 * `SnakeEditor` leads with the workflow file rather than with the options.
 */
export const renderSnake: BlockRenderer<'snake'> = ({
  username,
  branch,
  darkVariant,
  align: alignment
}) => {
  const user = username.trim()
  const ref = branch.trim() || 'output'
  if (!user) return ''

  const light = SNAKE_OUTPUT(user, ref, 'github-snake.svg')
  const alt = escapeHtml(`${user}'s contribution grid being eaten by a snake`)

  // `<picture>` is the only way to serve a different image per colour scheme in
  // a README — GitHub strips CSS, but it honours `prefers-color-scheme` here.
  const markup = darkVariant
    ? [
        '<picture>',
        `  <source media="(prefers-color-scheme: dark)" srcset="${SNAKE_OUTPUT(user, ref, 'github-snake-dark.svg')}" />`,
        `  <source media="(prefers-color-scheme: light)" srcset="${light}" />`,
        `  <img src="${light}" alt="${alt}" />`,
        '</picture>'
      ].join('\n')
    : `<img src="${light}" alt="${alt}" />`

  return align(markup, alignment, 'p')
}
