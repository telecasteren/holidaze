import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/company/contact/')({
  component: Contact,
  notFoundComponent: () => {
     return <p>This page doesn't exist.</p>
   },
})

function Contact() {
  return (
      <section>
        <p>Contact</p>
      </section>
  )
}
