import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/booking/calendar')({
  component: Calendar,
  notFoundComponent: () => {
     return <p>This page doesn't exist.</p>
   },
})

function Calendar() {
  return <div>Hello "/booking/calendar"!</div>
}
