import { SITE_INDEX_ROUTES, SITE_URL } from '../../site.config'

export default defineEventHandler((event) => {
  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')

  const urls = SITE_INDEX_ROUTES
    .map(route => `  <url><loc>${new URL(route, SITE_URL).toString()}</loc></url>`)
    .join('\n')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    ''
  ].join('\n')
})
