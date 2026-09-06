import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/legal/privacy')({
  component: Privacy,
  head: () => ({
    meta: [
      {
        name: "privacy",
        content: "Get familiar with and understand our policies and how we follow privacy.",
      },
      { title: "Privacy & Security | Holidaze" },
    ],
  }),
  notFoundComponent: () => {
     return <p>This page doesn't exist.</p>
   },
})

function Privacy() {
  return <div>Hello "/legal/privacy"!</div>
}
