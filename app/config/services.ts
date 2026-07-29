/**
 * Base URLs for the third-party widget services a profile README can embed.
 *
 * Everything here resolves to a plain image URL, so none of it costs us an API
 * call — we only assemble query strings. Keeping the hosts in one file means a
 * service swap is a one-line change.
 */

/**
 * The public github-readme-stats instance shares a single GitHub API token
 * across every user of it, so it returns 503 fairly often. That is an upstream
 * capacity problem, not a bug in this app. Deploy your own instance and point
 * this at it: https://github.com/anuraghazra/github-readme-stats#deploy-on-your-own
 */
export const STATS_HOST = 'https://github-readme-stats.vercel.app'

/**
 * Do NOT point this at `github-readme-streak-stats.herokuapp.com`. That host
 * stopped resolving when Heroku ended free dynos, though most tutorials online
 * still reference it. `demolab.com` is the maintained replacement.
 */
export const STREAK_HOST = 'https://streak-stats.demolab.com'

export const SERVICES = {
  skillIcons: 'https://skillicons.dev/icons',
  stats: `${STATS_HOST}/api`,
  topLangs: `${STATS_HOST}/api/top-langs/`,
  streak: `${STREAK_HOST}/`,
  shields: 'https://img.shields.io/badge',
  visitors: 'https://komarev.com/ghpvc/'
} as const
