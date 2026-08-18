import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/legal/privacy')({
  component: Privacy,
  notFoundComponent: () => {
     return <p>This page doesn't exist.</p>
   },
})

function Privacy() {
  return <div>Hello "/legal/privacy"!</div>
}
