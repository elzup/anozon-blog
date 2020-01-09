import * as React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { rhythm, scale } from '../utils/typography'
import Bio from './bio'

const LargeTitle = ({ title }: { title: string }) => (
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

const SmallTitle = ({ title }: { title: string }) => (
  <h3 style={{ fontFamily: `Montserrat, sans-serif`, marginTop: 0 }}>
    <Link
      style={{ boxShadow: `none`, textDecoration: `none`, color: `inherit` }}
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
  grid-template-columns: 1fr ${rhythm(10)};

  @media only screen and (min-width: 900px) {
    max-width: 1100px;
    grid-template-areas:
      'header header'
      'main side'
      'footer footer';
  }
  @media only screen and (max-width: 900px) {
    grid-template-areas:
      'header header'
      'main main'
      'side side'
      'footer footer';
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
  footer {
    grid-area: footer;
  }
`

const Layout: React.FC<{ location: { pathname: string }; title: string }> = ({
  location,
  title,
  children,
}) => {
  // eslint-disable-next-line no-undef

  const rootPath = `/`
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
          <Bio />
          <p>👷サイドバー準備中</p>
        </aside>
        <footer>
          © {new Date().getFullYear()} あのぞんびより All Rights Reserved
        </footer>
      </Wrapper>
    </div>
  )
}

export default Layout
