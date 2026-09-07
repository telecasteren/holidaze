import React from 'react'
import { Link } from '@tanstack/react-router'

interface LinkToAccountProps {
  unstyled?: boolean
  profileId: string
  children?: string | React.ReactNode
  styles?: React.CSSProperties
  icon?: React.ReactNode
}

export const LinkToAccount = React.forwardRef<
  HTMLAnchorElement,
  LinkToAccountProps
>(({ unstyled, profileId, children, styles, icon, ...rest }, ref) => {
  return (
    <Link
      ref={ref}
      aria-label="Link to account"
      className={unstyled ? '' : 'link-underline'}
      to="/account/$profileId"
      params={{ profileId: profileId }}
      style={{
        width: 'fit-content',
        textDecoration: 'none',
        color: 'inherit',
        display: 'flex',
        alignItems: 'center',
        marginTop: 1,
        ...styles,
      }}
      {...rest}
    >
      {children} {icon}
    </Link>
  )
})
