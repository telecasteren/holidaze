import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/company/about')({
  component: About,
  notFoundComponent: () => {
     return <p>This page doesn't exist.</p>
   },
})

function About() {
  return (
    <section>
      <p>About</p>
    </section>
  )
}
