import { Link } from 'gatsby'
import * as React from 'react'
import styled from 'styled-components'
import { rhythm } from '../utils/typography'
import Bio from './Bio'
import CustomMdxProvider from './markdown/wap-root-element'
import SideBar from './SideBar'

const LargeTitle = ({ title }: { title: string }) => (
  <h1>
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
  grid-gap: ${rhythm(1)};
  @media only screen and (min-width: 992px) {
    max-width: 1200px;
    grid-template-areas:
      'header header'
      'title title'
      'main side'
      'footer footer';
  }
  @media only screen and (max-width: 992px) {
    padding: ${rhythm(1)} ${rhythm(1 / 2)};
    grid-template-columns: 1fr;
    grid-gap: ${rhythm(0.5)};
    grid-template-areas:
      'header'
      'title'
      'main'
      'side'
      'footer';
  }
  header {
    grid-area: header;
  }
  main {
    grid-area: main;
    overflow: hidden;
  }
  .title {
    text-align: center;
    grid-area: title;
  }
  aside {
    grid-area: side;
  }
  footer {
    grid-area: footer;
  }
`

const Layout: React.FC<{
  location: Location
  title: string
  articleTitle?: string
}> = ({ articleTitle = null, location, title, children }) => {
  // eslint-disable-next-line no-undef

  const rootPath = `/`
  const isTopPage = location.pathname === rootPath
  const header = isTopPage ? (
    <LargeTitle title={title} />
  ) : (
    <SmallTitle title={title} />
  )

  return (
    <div>
      <Wrapper>
        <header>{header}</header>
        <div className="title">{articleTitle && <h1>{articleTitle}</h1>}</div>
        <main>{children}</main>
        <aside>
          <Bio />
          <SideBar />
        </aside>
        <footer>
          © {new Date().getFullYear()} あのぞんびより All Rights Reserved
        </footer>
      </Wrapper>
    </div>
  )
}

export default Layout
