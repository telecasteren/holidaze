import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/company/contact/thank-you')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/company/contact/thank-you"!</div>
}
