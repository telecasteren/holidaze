import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
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
