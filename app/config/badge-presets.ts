import type { BadgeItem } from '~/types'

/**
 * Starting points for the free-form badge block.
 *
 * Every preset is a complete `BadgeItem`, so picking one drops a finished badge
 * into the list that the user then edits — faster than typing four fields to
 * find out what the shape even is.
 */
export const BADGE_PRESETS: { group: string, items: BadgeItem[] }[] = [
  {
    group: 'Status',
    items: [
      { label: 'Status', message: 'Open to work', color: '10B981', logo: '', href: '' },
      { label: 'Focus', message: 'Building', color: '6C20FF', logo: 'rocket', href: '' },
      { label: 'Location', message: 'Phnom Penh', color: '009CFF', logo: 'googlemaps', href: '' },
      { label: 'Timezone', message: 'UTC+7', color: '64748B', logo: 'clockify', href: '' }
    ]
  },
  {
    group: 'Craft',
    items: [
      { label: 'Code', message: 'TypeScript', color: '3178C6', logo: 'typescript', href: '' },
      { label: 'Editor', message: 'VS Code', color: '007ACC', logo: 'visualstudiocode', href: '' },
      { label: 'Runtime', message: 'Node', color: '5FA04E', logo: 'nodedotjs', href: '' },
      { label: 'Cloud', message: 'AWS', color: 'FF9900', logo: 'amazonwebservices', href: '' }
    ]
  },
  {
    group: 'Links',
    items: [
      { label: '', message: 'Read the docs', color: '001038', logo: 'readthedocs', href: 'https://' },
      { label: 'License', message: 'MIT', color: 'F59E0B', logo: 'opensourceinitiative', href: '' },
      { label: '', message: 'Live demo', color: '000000', logo: 'vercel', href: 'https://' }
    ]
  }
]

/** A blank badge, used by the "add" button. */
export const EMPTY_BADGE = (): BadgeItem => ({
  label: '',
  message: 'New badge',
  color: '6C20FF',
  logo: '',
  href: ''
})
