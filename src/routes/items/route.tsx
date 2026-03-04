import { createFileRoute } from '@tanstack/react-router'
import { getItems } from '../../store.ts'

export const Route = createFileRoute('/items')({
  loader: () => getItems(),
})
