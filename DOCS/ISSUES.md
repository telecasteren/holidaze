## HTML Validator errors

> **"Element `style` not allowed as child of element `h1` in this context.."**<br/>
> This seems to be a known weakness, as Tanstack Start don't solve this atm, so MUI style tags are being added at runtime. Similarily, Next.js solves this through `AppRouterCacheProvider` from `mui/material-nextjs`. I've decided to accept this weakness, since it doesn't affect the end-product in terms of UI styling or accessibility. Will revisit this once Tanstack has a solution to this.

> **"Saw U+0000 in stream."**<br/>
> My suspicion is it's from TanStack routers SSR state and how its serialised into the <script> tags, so I kind of need to accepted that. Doesn't seem to impact any user-facing parts.

_Example_

```bash
Error: Saw U+0000 in stream.
At line 1, column 204503
2]={i:"__root__",u:1789931836
```

Will revisit if needed.

## MUI known issues/warnings

> **"MUI-x-charts hover bug"**<br/>
> `An input selector returned a different result when passed same arguments. This means your output selector will likely run more frequently than intended. Avoid returning a new reference inside your input selector`<br/>
> Seems like a developer warning that only happen upon hoverering the chart component, but not affecting the UI or user experience. Someone else experiencing it as-we-speak: [github_issue](https://github.com/mong/mongts/pull/5064). Tested their webpage [skde.no](skde.no) to see if I found the warning in production, but I don't so I'll accept the warning in dev. _**Could not reproduce it in prod after release.**_

> **"MUI focus trap"**<br/>
> `Blocked aria-hidden on an element because its descendant retained focus. The focus must not be hidden from assistive technology users. Avoid using aria-hidden on a focused element or its ancestor....`<br/>
> **Affected areas:** MUI Drawer and Dialogue components.<br/>
> **Solution:** adding `closeAfterTransition={false}` on Drawer and Dialogue.<br/>
> [MUI official docs](https://mui.com/material-ui/react-modal/#focus-trap)<br/>
> [MUI github issue](https://github.com/mui/material-ui/issues/46682)<br/>
