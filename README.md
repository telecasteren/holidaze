# Holidaze

### A venue booking system where users can browse and book venues, manage their venues and bookings.

**Author:** Tele Caster Nilsen<br/>
**Website:** https://telecasternilsen.com
---

**Table of Contents**
- [Introduction](#introduction)
- [Technologies](#technologies)
- [Installation](#installation)
- [Session Management](#session_management)
- [AI Usage](#ai_usage)


## Introduction

This project is my exams project at Noroff School of Technology and Digital Media.

## Technologies

- React
- TypeScript
- TanStack Start
- MUI
- Zod
- react-hot-toast
- Noroff v2 REST API

*Noroff API docs:*
[API overview](https://docs.noroff.dev/docs/v2/holidaze/bookings) | 
[Swagger API](https://v2.api.noroff.dev/docs/static/index.html#/holidaze-profiles)

## Installation

Clone the repository

```bash
git clone https://github.com/telecasternilsen/holidaze.git
```

Navigate to the project directory

```bash
cd holidaze
```

Install dependencies and run the app

```bash
pnpm install
pnpm dev
```

Build this app for production

```bash
pnpm build
```

### Deployment

This app is deployed on Netlify.<br/>
**Live site:** [holidaze](https://holidaze.telecasternilsen.com)
<br/>

**Linting & Formatting**


This project uses [eslint](https://eslint.org/) and [prettier](https://prettier.io/) for linting and formatting. Eslint is configured using [tanstack/eslint-config](https://tanstack.com/config/latest/docs/eslint). The following scripts are available:

```bash
pnpm lint
pnpm format
pnpm check
```

### Session Management

This app uses a cookie-based session management system, utilizing the TanStack Cookie Store. Server functions can be found here: [src/server/](src/server/session.ts).

All authentication logic is handled server-side. That means that all authenticated endpoints require a valid session cookie, and must be called from the server, never from the client. See example invoked from the server: [profileFunctions](src/server/profileFunctions.ts), then served to the client: [profilesQuery](src/lib/queries/profilesQuery.ts).

### Application Weaknesses

**Venues: toggling favorites**<br/>
Currently, it only tracks the state of added/removed favorites client side. This is because the API does not support persistent storage of favorites. Hence, this feature is purely visual.

**Login: Forgot password route**<br/>
Purely visual, no `password reset` logic implemented.

**Login: Remember me**<br/>
Purely visual, no `remember me` logic implemented.

---

## AI Usage

In this project, AI can be used to:

- Brainstorming, wireframe and initial architectural discussions
- Explaining concepts / rubberducking
- Generating some boilerplate / scaffolding
- Drafting initial documentation and JSDocs

*All AI usage is logged and can be found in [AI_LOG.md](AI_LOG.md).*


### Resources

- Material UI documentation and template: [Marketing page](https://mui.com/material-ui/getting-started/templates/)
- Material UI [createTheme and colors](https://mui.com/material-ui/customization/color/)
- Material UI [colour system](https://m2.material.io/design/color/the-color-system.html#tools-for-picking-colors)
- TanStack Start [docs](https://tanstack.com/start/latest/docs/framework/react/getting-started)
- TanStack search params [docs](https://tanstack.com/router/latest/docs/guide/search-params)
- MUI breakpoints [docs](https://mui.com/material-ui/customization/breakpoints/)
- MUI Pagination [docs](https://mui.com/material-ui/react-pagination/)
- React Avatar and `stringAvatar` [docs](https://mui.com/material-ui/react-avatar/)
- Authentication service [docs](https://www.robinwieruch.de/how-to-roll-your-own-auth/)
- TanStack cookie store and server fn [docs](https://tanstack.com/start/latest/docs/framework/react/guide/authentication-server-primitives)
- TanStack beforeLoad / loader [docs](https://github.com/TanStack/router/discussions/1949)
- TanStack stripSearchParams [docs](https://tanstack.com/router/latest/docs/api/router/stripSearchParamsFunction)
- Untitled UI Range Calendar [docs](https://www.untitledui.com/react/components/date-pickers)
