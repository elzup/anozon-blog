import { Link } from 'gatsby'
import * as React from 'react'
import styled from 'styled-components'
import { rhythm } from '../utils/typography'
import Bio from './Bio'
import SideBar from './SideBar'

const TitleLink = styled(Link)`
  box-shadow: none;
  text-decoration: none;
  color: #2d2252;
  background-image: none;
  transition: color 0.2s ease;
  &:hover {
    color: #6b4ecf;
  }
`

const LargeTitle = ({ title }: { title: string }) => (
  <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
    <TitleLink to={`/`}>{title}</TitleLink>
  </h1>
)

const SmallTitle = ({ title }: { title: string }) => (
  <h3 style={{ fontFamily: `Montserrat, sans-serif`, marginTop: 0, marginBottom: 0, fontSize: '1rem' }}>
    <TitleLink to={`/`}>{title}</TitleLink>
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
    padding: ${rhythm(1)} 0px;
    grid-template-columns: 1fr;
    grid-gap: ${rhythm(0.5)};
    grid-template-areas:
      'header'
      'title'
      'main'
      'side'
      'footer';
    .title {
      padding: 0 30px;
    }
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
    max-width: 800px;
    margin: 0 auto;
  }
  aside {
    grid-area: side;
  }
  footer {
    grid-area: footer;
  }
`

const Footer = styled.footer`
  text-align: center;
  padding: 24px 0;
  font-size: 0.8rem;
  color: #8e82a6;
  span {
    opacity: 0.8;
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
        <Footer>
          <span>© {new Date().getFullYear()} あのぞんびより</span>
        </Footer>
      </Wrapper>
    </div>
  )
}

export default Layout
