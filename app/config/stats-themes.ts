import type { StatsTheme } from '~/types'

export const STATS_THEMES: StatsTheme[] = [
  'default',
  'dark',
  'radical',
  'tokyonight',
  'dracula',
  'gruvbox',
  'onedark',
  'synthwave',
  'merko',
  'transparent'
]

/** Ready for a `USelect`, with labels title-cased. */
export const STATS_THEME_OPTIONS = STATS_THEMES.map(theme => ({
  label: theme.charAt(0).toUpperCase() + theme.slice(1),
  value: theme
}))
