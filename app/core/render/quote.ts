import { SERVICES } from '~/config/services'
import type { BlockRenderer } from '~/types'
import { align, qs } from './helpers'

export const renderQuote: BlockRenderer<'quote'> = ({
  layout,
  theme,
  border,
  animate,
  align: alignment
}) => {
  const url = `${SERVICES.quotes}?${qs({
    type: layout,
    theme,
    border,
    animation: animate ? 'grow_out_in' : undefined
  })}`

  return align(`<img src="${url}" alt="Random dev quote" />`, alignment, 'p')
}
