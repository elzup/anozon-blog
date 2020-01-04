import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

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

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(40)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
  display: grid;
  grid-template-areas: 'header header' 'main side';
  grid-template-columns: ${rhythm(24)} ${rhythm(16)};

  @media only screen and (min-width: 1240px) {
    width: 1100px;
  }
  header {
    grid-area: header;
  }
  main {
    grid-area: main;
  }
  aside {
    grid-area: side;
  }
`

function Layout({ location, title, children }) {
  const rootPath = `${__PATH_PREFIX__}/`
  const header =
    location.pathname === rootPath ? (
      <LargeTitle title={title} />
    ) : (
      <SmallTitle title={title} />
    )

  return (
    <div>
      <Wrapper>
        <header>{header}</header>
        <main>{children}</main>
        <aside>
          <p>I'm elzup</p>
          <p>Hello sub menu card</p>
        </aside>
        <footer>
          © {new Date().getFullYear()} あのぞんびより All Rights Reserved
        </footer>
        <style jsx>{}</style>
      </Wrapper>
    </div>
  )
}

export default Layout
