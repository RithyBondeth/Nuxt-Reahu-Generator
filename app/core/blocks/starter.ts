import type { Block } from '~/types'
import { createBlock } from './factory'

/**
 * The document a first-time visitor lands on.
 *
 * Kept to blocks that render something immediately. The graph blocks all need a
 * username before they draw anything, so seeding them would open the builder on
 * a preview full of gaps — they are one click away in the palette instead.
 */
export function starterBlocks(): Block[] {
  return [
    createBlock('header'),
    createBlock('typing'),
    createBlock('about'),
    createBlock('techStack'),
    createBlock('stats'),
    createBlock('socials')
  ]
}
