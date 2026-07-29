import type { Block } from '~/types'
import { createBlock } from './factory'

/** The document a first-time visitor lands on. */
export function starterBlocks(): Block[] {
  return [
    createBlock('header'),
    createBlock('about'),
    createBlock('techStack'),
    createBlock('stats'),
    createBlock('socials')
  ]
}
