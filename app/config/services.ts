/**
 * Base URLs for the third-party widget services a profile README can embed.
 *
 * Everything here resolves to a plain image URL, so none of it costs us an API
 * call — we only assemble query strings. Keeping the hosts in one file means a
 * service swap is a one-line change.
 *
 * Every host below is a community project running on someone else's free tier.
 * Treat an occasional 503 as normal and self-host anything you depend on.
 */

/**
 * github-readme-stats — the stats card, the language chart, and repo pins.
 *
 * The project's own instance shares one GitHub API token across everybody using
 * it, so it has always returned 503 under load. As of this writing it is worse
 * than that: every request comes back `503 DEPLOYMENT_PAUSED`, including ones
 * with no parameters, so the deployment is off rather than throttled.
 *
 * `STATS_HOST` therefore points at a community deployment of the same
 * open-source service, which is the only reason those three blocks render at
 * all right now. Two things worth knowing about that choice:
 *
 *   1. It is somebody else's Vercel project, unaffiliated with the upstream
 *      repo. Every visitor to your README requests an image from it.
 *   2. It can go the same way as the canonical host at any time.
 *
 * The real fix, and the one the upstream project recommends, is to run your
 * own: https://github.com/anuraghazra/github-readme-stats#deploy-on-your-own
 * Then set `STATS_HOST` to your instance.
 */
const STATS_HOST = 'https://gh-readme-stats.vercel.app'

/**
 * Do NOT point this at `github-readme-streak-stats.herokuapp.com`. That host
 * stopped resolving when Heroku ended free dynos, though most tutorials online
 * still reference it. `demolab.com` is the maintained replacement.
 */
const STREAK_HOST = 'https://streak-stats.demolab.com'

/**
 * Same story as the streak service: `readme-typing-svg.herokuapp.com` is dead
 * and still all over the internet. This is the live one.
 */
const TYPING_HOST = 'https://readme-typing-svg.demolab.com'

/**
 * The canonical trophy host, `github-profile-trophy.vercel.app`, currently
 * answers every request with `402 DEPLOYMENT_DISABLED` — the maintainer's
 * Vercel project is switched off, not rate-limited, so it will not recover on a
 * retry. This is a working deployment of the same service and takes the same
 * parameters. Check the canonical host before changing this back.
 */
const TROPHY_HOST = 'https://github-trophies.vercel.app'

export const SERVICES = {
  skillIcons: 'https://skillicons.dev/icons',
  stats: `${STATS_HOST}/api`,
  topLangs: `${STATS_HOST}/api/top-langs/`,
  pin: `${STATS_HOST}/api/pin/`,
  streak: `${STREAK_HOST}/`,
  typing: `${TYPING_HOST}/`,
  /** Full-shape badges: `/badge/<label>-<message>-<color>`. */
  shields: 'https://img.shields.io/badge',
  /** Live-data badges: `/github/followers/<user>`, `/github/stars/<user>`. */
  shieldsRoot: 'https://img.shields.io',
  visitors: 'https://komarev.com/ghpvc/',
  capsule: 'https://capsule-render.vercel.app/api',
  trophy: `${TROPHY_HOST}/`,
  activity: 'https://github-readme-activity-graph.vercel.app/graph',
  quotes: 'https://quotes-github-readme.vercel.app/api'
} as const

/**
 * Where the contribution-snake action publishes its SVG. Unlike everything else
 * here this is not a live service — a GitHub Action in the user's own profile
 * repo generates the file on a schedule and commits it to a branch, and we only
 * point at the result. `SnakeEditor` hands out the workflow that does it.
 */
export const SNAKE_OUTPUT = (user: string, branch: string, file: string) =>
  `https://raw.githubusercontent.com/${user}/${user}/${branch}/${file}`
