import React from 'react'
import { Link } from 'gatsby'

import { rhythm, scale } from '../utils/typography'

const LargeTitle = ({ title }) => (
  <h1
    style={{
      ...scale(1.5),
      marginBottom: rhythm(1.5),
      marginTop: 0,
    }}
  >
    <Link
      style={{ boxShadow: `none`, textDecoration: `none`, color: `inherit` }}
      to={`/`}
    >
      {title}
    </Link>
  </h1>
)

const SmallTitle = ({ title }) => (
  <h3 style={{ fontFamily: `Montserrat, sans-serif`, marginTop: 0 }}>
    <Link
      style={{
        boxShadow: `none`,
        textDecoration: `none`,
        color: `inherit`,
      }}
      to={`/`}
    >
      {title}
    </Link>
  </h3>
)

function Layout({ location, title, children }) {
  const rootPath = `${__PATH_PREFIX__}/`
  const header =
    location.pathname === rootPath ? (
      <LargeTitle title={title} />
    ) : (
      <SmallTitle title={title} />
    )

  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()} あのぞんびより All Rights Reserved
      </footer>
    </div>
  )
}

export default Layout
