import type { ActivityTheme, StatsTheme, TrophyTheme } from '~/types'

/**
 * Theme catalogues for the three card services.
 *
 * Each list was taken from the upstream source, not from a tutorial: all three
 * services fall back to their default palette when handed a name they do not
 * know, so a wrong slug ships as a card that silently ignores the user's choice
 * rather than as an error anyone would notice.
 *
 * Themes are grouped by how they read rather than alphabetically — picking a
 * palette is a visual decision, and "dark and muted" is the useful axis.
 */

interface ThemeGroup<T> {
  group: string
  themes: T[]
}

/** github-readme-stats, streak, and repo pins all share this set. */
export const STATS_THEME_GROUPS: ThemeGroup<StatsTheme>[] = [
  {
    group: 'Popular',
    themes: ['tokyonight', 'radical', 'dracula', 'onedark', 'gruvbox', 'merko', 'synthwave', 'catppuccin_mocha', 'nightowl', 'shades-of-purple']
  },
  {
    group: 'Neutral',
    themes: ['default', 'dark', 'transparent', 'github_dark', 'github_dark_dimmed', 'graywhite', 'gotham', 'nord', 'darcula', 'apprentice', 'noctis_minimus']
  },
  {
    group: 'Light',
    themes: ['default', 'buefy', 'solarized-light', 'gruvbox_light', 'catppuccin_latte', 'vue', 'bear', 'graywhite']
  },
  {
    group: 'Vivid',
    themes: ['neon', 'outrun', 'holi', 'jolly', 'maroongold', 'yeblu', 'blueberry', 'slateorange', 'rose', 'rose_pine', 'panda', 'aura', 'aura_dark', 'calm', 'calm_pink', 'date_night']
  },
  {
    group: 'Editors',
    themes: ['monokai', 'material-palenight', 'one_dark_pro', 'cobalt', 'cobalt2', 'ayu-mirage', 'city_lights', 'swift', 'prussian', 'solarized-dark', 'algolia', 'blue-green', 'blue_navy', 'ocean_dark', 'midnight-purple', 'chartreuse-dark', 'vue-dark', 'react', 'discord_old_blurple', 'codeSTACKr', 'moltack', 'kacho_ga', 'great-gatsby', 'flag-india', 'omni', 'shadow_blue', 'shadow_green', 'shadow_red', 'ambient_gradient', 'highcontrast', 'vision-friendly-dark']
  }
]

export const TROPHY_THEMES: TrophyTheme[] = [
  'flat', 'onedark', 'gruvbox', 'dracula', 'monokai', 'chalk', 'nord', 'alduin',
  'darkhub', 'juicyfresh', 'buddhism', 'oldie', 'radical', 'onestar', 'discord',
  'algolia', 'gitdimmed', 'tokyonight', 'matrix', 'apprentice', 'dark_dimmed',
  'dark_lover', 'kimbie_dark', 'aura', 'default'
]

export const ACTIVITY_THEMES: ActivityTheme[] = [
  'github-compact', 'github', 'github-dark', 'github-dark-dimmed', 'github-light',
  'react', 'react-dark', 'vue', 'xcode', 'rogue', 'nord', 'gotham', 'dracula',
  'merko', 'gruvbox', 'monokai', 'nightowl', 'noctis-minimus', 'tokyo-night',
  'tokyo-day', 'radical', 'redical', 'chartreuse-dark', 'material',
  'material-palenight', 'one-dark', 'cobalt', 'synthwave-84', 'minimal',
  'modern-lilac', 'elegant', 'lucent', 'arctic', 'aqua', 'coral', 'green',
  'high-contrast'
]

/** `tokyo-night` → `Tokyo night`. Slugs are for URLs, not for reading. */
const humanize = (slug: string) => {
  const words = slug.replace(/[-_]/g, ' ')
  return words.charAt(0).toUpperCase() + words.slice(1)
}

const toOption = <T extends string>(theme: T) => ({ label: humanize(theme), value: theme })

/**
 * Grouped options for `USelectMenu`. A theme may appear in more than one group
 * (`default` is both neutral and light), so entries are keyed by group as well
 * as value to keep them distinct in the list.
 */
export const STATS_THEME_OPTIONS = STATS_THEME_GROUPS.flatMap(({ group, themes }) =>
  themes.map(theme => ({ ...toOption(theme), group }))
)

export const TROPHY_THEME_OPTIONS = TROPHY_THEMES.map(toOption)
export const ACTIVITY_THEME_OPTIONS = ACTIVITY_THEMES.map(toOption)

/** Flat list of every distinct stats theme, for counts and validation. */
export const STATS_THEMES: StatsTheme[] = [
  ...new Set(STATS_THEME_GROUPS.flatMap(({ themes }) => themes))
]
