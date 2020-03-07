import * as React from 'react'
import { Link, graphql } from 'gatsby'

import kebabCase from 'lodash/kebabCase'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import { rhythm } from '../utils/typography'
import {
  SitePageContext,
  TagSearchQuery,
  TagSearchQueryVariables,
} from '../../types/graphql-types.d'
import Pagination from '../components/Pagination'

type Props = {
  location: Location
  data: TagSearchQuery
  pageContext: SitePageContext & TagSearchQueryVariables
}

function TagPageTemplate({ data, pageContext, location }: Props) {
  const { pages, site } = data
  const siteTitle = site.siteMetadata.title
  const { tag } = pageContext

  const PageBar = (
    <Pagination
      prefix={`/tags/${kebabCase(tag)}`}
      current={pageContext.currentPage || 1}
      last={pageContext.numPages || 1}
    />
  )

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={`${tag} - ${siteTitle}`} description={`${tag}の記事一覧`} />
      <h1>{tag}</h1>
      {pageContext.currentPage > 1 && PageBar}
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
      {PageBar}
    </Layout>
  )
}

export default TagPageTemplate

export const pageQuery = graphql`
  query TagSearch($tag: String, $skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    pages: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] }, status: { ne: "draft" } } }
      limit: $limit
      skip: $skip
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
