import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/legal/terms')({
  component: Terms,
  notFoundComponent: () => {
     return <p>This page doesn't exist.</p>
   },
})

function Terms() {
  return <div>Hello "/legal/terms"!</div>
}
