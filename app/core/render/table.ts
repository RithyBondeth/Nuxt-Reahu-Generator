import type { BlockRenderer } from '~/types'
import { heading } from './helpers'

/** The dashes row that tells Markdown how to align each column. */
const RULE = {
  left: ':---',
  center: ':---:',
  right: '---:'
} as const

/**
 * A pipe inside a cell would end the cell early, and Markdown has no way to
 * quote one — escaping it is the documented fix.
 */
const cell = (value: string) => value.trim().replace(/\|/g, '\\|') || ' '

export const renderTable: BlockRenderer<'table'> = ({
  heading: title,
  columns,
  rows,
  columnAlign
}) => {
  const headers = columns.map(column => column.trim()).filter(Boolean)
  if (!headers.length) return ''

  // Ragged rows are padded rather than rejected: the editor lets you add a
  // column after typing rows, and half a table is not worth refusing to render.
  const body = rows
    .filter(row => row.some(value => value.trim()))
    .map(row => `| ${headers.map((_, index) => cell(row[index] ?? '')).join(' | ')} |`)

  if (!body.length) return ''

  const head = `| ${headers.map(cell).join(' | ')} |`
  const rule = `| ${headers.map(() => RULE[columnAlign]).join(' | ')} |`

  return heading(title) + [head, rule, ...body].join('\n')
}
