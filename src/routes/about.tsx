import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
  notFoundComponent: () => {
     return <p>This page doesn't exist.</p>
   },
})

function About() {
  return (
    <main>
      <section>
        <p>About</p>
      </section>
    </main>
  )
}
