/** Copy for the marketing page, kept out of the template markup. */

export const LANDING_HERO = {
  pill: '17 blocks · zero accounts',
  title: 'Your GitHub profile,',
  titleAccent: 'assembled.',
  description: 'Build a profile README from focused, flexible blocks. Edit on the left, preview on the right, then commit the Markdown.'
}

export const LANDING_BLOCKS = {
  eyebrow: 'Block library',
  /**
   * `{count}` is filled from the block registry at render time. The previous
   * copy said "six blocks" and had to be remembered every time one was added,
   * which is exactly the kind of promise that quietly goes stale.
   */
  title: '{count} building blocks',
  description: 'Start with a useful default, keep what sounds like you, remove everything else.'
}

export const LANDING_MARQUEE = {
  eyebrow: 'Works with your stack',
  title: 'The tools you use are already here'
}

export const LANDING_MAKER = {
  name: 'Rithy Bondeth',
  role: 'Full-stack developer & AI engineer',
  location: 'Phnom Penh, Cambodia',
  description: 'I built Reahu to make a polished developer profile feel less like formatting work and more like telling your story.',
  portfolioUrl: 'https://bondeth.dev',
  githubUrl: 'https://github.com/RithyBondeth',
  repositoryUrl: 'https://github.com/RithyBondeth/Nuxt-Reahu-Generator'
}

/**
 * Three claims, each one a thing the tool actually does differently — not a
 * feature grid. Anything that could be said about any builder was cut.
 */
export const LANDING_CLAIMS = [
  {
    icon: 'i-lucide-shield-check',
    title: 'Private by default',
    description: 'No account and no database. Your draft stays on your device.'
  },
  {
    icon: 'i-lucide-undo-2',
    title: 'Hard to lose',
    description: 'Autosave and complete undo history keep every edit within reach.'
  },
  {
    icon: 'i-lucide-contrast',
    title: 'GitHub-accurate',
    description: 'Inspect the result in light and dark before you publish it.'
  }
]
