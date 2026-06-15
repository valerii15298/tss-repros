import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test')({
  server: {
    handlers: {
        POST: () => new Response('Hello POST /test!'),
    }
  }
})
