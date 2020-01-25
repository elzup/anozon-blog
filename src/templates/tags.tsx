import * as React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/Seo'
import { rhythm } from '../utils/typography'
import {
  SitePageContext,
  TagSearchQuery,
  TagSearchQueryVariables,
} from '../../types/graphql-types.d'

type Props = {
  location: Location
  data: TagSearchQuery
  pageContext: SitePageContext & TagSearchQueryVariables
}

function TagPageTemplate(props: Props) {
  const { pages, site } = props.data
  const siteTitle = site.siteMetadata.title
  const { tag } = props.pageContext

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title={`${tag} - ${siteTitle}`} description={`${tag}の記事一覧`} />
      <h1>{tag}</h1>
      {pages.edges.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug

        return (
          <div key={node.fields.slug}>
            <h3
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link style={{ boxShadow: `none` }} to={`/${node.fields.slug}`}>
                {title}
              </Link>
            </h3>
            <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </div>
        )
      })}
    </Layout>
  )
}

export default TagPageTemplate

export const pageQuery = graphql`
  query TagSearch($tag: String) {
    site {
      siteMetadata {
        title
        author
      }
    }
    pages: allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] }, status: { ne: "draft" } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
          }
        }
      }
    }
  }
`
