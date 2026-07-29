/** Copy for the marketing page, kept out of the template markup. */

export const LANDING_HERO = {
  eyebrow: 'github profile readme',
  title: 'Compose it.',
  titleAccent: 'Don\'t copy it.',
  description: 'Stack blocks, watch them render, commit the Markdown. No account and no server — the whole thing runs in your browser.'
}

export const LANDING_BLOCKS = {
  eyebrow: 'the vocabulary',
  title: 'Six blocks, any order',
  description: 'Drag to rearrange, duplicate what you need, delete what you don\'t. The document is the list.'
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
