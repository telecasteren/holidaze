import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/company/careers')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/company/careers"!</div>
}
