/** Copy for the marketing page, kept out of the template markup. */

export const LANDING_HERO = {
  pill: 'No account. No server. No upload.',
  title: 'Compose it.',
  titleAccent: 'Don\'t copy it.',
  description: 'Stack blocks, watch them render, commit the Markdown. Your GitHub profile README, built in about two minutes.'
}

export const LANDING_BLOCKS = {
  eyebrow: 'the vocabulary',
  /**
   * `{count}` is filled from the block registry at render time. The previous
   * copy said "six blocks" and had to be remembered every time one was added,
   * which is exactly the kind of promise that quietly goes stale.
   */
  title: '{count} blocks, any order',
  description: 'Drag to rearrange, duplicate what you need, delete what you don\'t. The document is the list.'
}

export const LANDING_MARQUEE = {
  eyebrow: 'tech stack',
  title: 'Every icon, one click away'
}

/**
 * Three claims, each one a thing the tool actually does differently — not a
 * feature grid. Anything that could be said about any builder was cut.
 */
export const LANDING_CLAIMS = [
  {
    icon: 'i-lucide-shield-check',
    title: 'Nothing leaves your browser',
    description: 'No account, no database. Your draft is saved locally, and a share link carries the whole document inside the URL itself.'
  },
  {
    icon: 'i-lucide-undo-2',
    title: 'Undo everything',
    description: 'Full history on ⌘Z, plus autosave as you type. A refresh never costs you work.'
  },
  {
    icon: 'i-lucide-contrast',
    title: 'Both GitHub themes',
    description: 'Flip the preview between light and dark on its own, because that is how visitors will actually see your profile.'
  }
]
