import { SITE_URL } from '../../site.config'

export default defineEventHandler((event) => {
  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')

  return [
    'User-agent: *',
    'Allow: /',
    'Disallow: /build',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    ''
  ].join('\n')
})
