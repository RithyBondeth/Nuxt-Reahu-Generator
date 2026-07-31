export const SITE_NAME = 'Reahu Generator'
export const SITE_URL = 'https://reahu-generator.vercel.app'
export const SITE_DESCRIPTION = 'Compose a GitHub profile README from drag-and-drop blocks. Live preview, shareable links, and Markdown download — no account or server required.'
export const SITE_OG_IMAGE = `${SITE_URL}/og-templates.png`

export const TEMPLATE_SLUGS = [
  'quiet-craft',
  'full-stack-signal',
  'learning-in-public',
  'open-source-pulse',
  'data-field-notes',
  'creative-system',
  'backend-blueprint',
  'mobile-momentum',
  'cloud-control-room',
  'research-ledger',
  'freelance-studio',
  'indie-launch'
] as const

export type TemplateSlug = typeof TEMPLATE_SLUGS[number]

export const SITE_INDEX_ROUTES = [
  '/',
  '/templates',
  ...TEMPLATE_SLUGS.map(slug => `/templates/${slug}`)
]
