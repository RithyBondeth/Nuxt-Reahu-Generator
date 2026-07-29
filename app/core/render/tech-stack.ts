import { SERVICES } from '~/config/services'
import { LOGO_ALIASES, TECH_ICON_LABELS } from '~/config/tech-icons'
import type { BlockRenderer } from '~/types'
import { align, badge, heading, imageRow, qs } from './helpers'

/**
 * Colours used when the block renders as badges rather than as a sprite grid.
 *
 * skillicons draws its own brand colours; shields does not, so a badge needs
 * one supplied. Rather than carry a brand hex for every one of the ~200 slugs,
 * anything unlisted falls back to the eclipse navy — a consistent dark badge
 * reads as deliberate, where a random colour per tool would not.
 */
const BADGE_COLORS: Record<string, string> = {
  ts: '3178C6', js: 'F7DF1E', python: '3776AB', go: '00ADD8', rust: '000000',
  java: 'ED8B00', kotlin: '7F52FF', swift: 'F05138', php: '777BB4', ruby: 'CC342D',
  cs: '512BD4', cpp: '00599C', c: 'A8B9CC', dart: '0175C2', lua: '2C2D72',
  html: 'E34F26', css: '1572B6', sass: 'CC6699', tailwind: '06B6D4',
  vue: '4FC08D', nuxtjs: '00DC82', react: '61DAFB', nextjs: '000000',
  svelte: 'FF3E00', angular: 'DD0031', astro: 'BC52EE', solidjs: '2C4F7C',
  nodejs: '5FA04E', bun: 'FBF0DF', deno: '70FFAF', express: '000000',
  nestjs: 'E0234E', django: '092E20', flask: '000000', fastapi: '009688',
  laravel: 'FF2D20', spring: '6DB33F', dotnet: '512BD4', rails: 'D30001',
  graphql: 'E10098', postgres: '4169E1', mysql: '4479A1', mongodb: '47A248',
  redis: 'DC382D', sqlite: '003B57', supabase: '3FCF8E', firebase: 'FFCA28',
  prisma: '2D3748', docker: '2496ED', kubernetes: '326CE5', aws: 'FF9900',
  gcp: '4285F4', azure: '0078D4', vercel: '000000', netlify: '00C7B7',
  nginx: '009639', linux: 'FCC624', terraform: '844FBA', git: 'F05032',
  github: '181717', gitlab: 'FC6D26', figma: 'F24E1E', vscode: '007ACC',
  tensorflow: 'FF6F00', pytorch: 'EE4C2C', flutter: '02569B'
}

const prettyName = (slug: string) =>
  TECH_ICON_LABELS[slug] ?? slug.charAt(0).toUpperCase() + slug.slice(1)

export const renderTechStack: BlockRenderer<'techStack'> = ({
  heading: title,
  icons,
  perLine,
  theme,
  align: alignment,
  provider,
  badgeStyle
}) => {
  // An unconfigured block contributes nothing rather than a dangling heading —
  // the downloaded file should never contain an empty section.
  if (!icons.length) return ''

  if (provider === 'badges') {
    const badges = icons.map(icon => badge({
      label: '',
      message: prettyName(icon),
      color: BADGE_COLORS[icon] ?? '001038',
      logo: LOGO_ALIASES[icon] ?? icon,
      style: badgeStyle,
      alt: prettyName(icon)
    }))

    return heading(title) + imageRow(badges, alignment)
  }

  const url = `${SERVICES.skillIcons}?${qs({ i: icons.join(','), theme, perline: perLine })}`

  return heading(title) + align(`<img src="${url}" alt="Tech stack" />`, alignment, 'p')
}
