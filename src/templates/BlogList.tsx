import { graphql } from 'gatsby'
import * as React from 'react'
import {
  BlogListBySlugQuery,
  BlogListBySlugQueryVariables,
  SitePageContext,
} from '../../types/graphql-types.d'
import ArticalCard from '../components/ArticleCard'
import Layout from '../components/Layout'
import Pagination from '../components/Pagination'
import SEO from '../components/Seo'

type Props = {
  data: BlogListBySlugQuery
  location: Location
  pageContext: SitePageContext & BlogListBySlugQueryVariables
}

function BlogListTemplate({ data, location, pageContext }: Props) {
  const { title } = data.site.siteMetadata
  const { edges } = data.posts

  return (
    <Layout location={location} title={title}>
      <SEO
        title="All posts"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />
      {edges.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug

        return (
          <ArticalCard
            key={node.fields.slug}
            title={title}
            slug={node.fields.slug}
            excerpt={node.excerpt}
            date={node.frontmatter.date}
            topics={node.frontmatter.topics}
          />
        )
      })}
      <Pagination
        current={pageContext.currentPage || 1}
        last={pageContext.numPages || 1}
      />
    </Layout>
  )
}

export default BlogListTemplate

export const pageQuery = graphql`
  query BlogListBySlug($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    posts: allMarkdownRemark(
      filter: { frontmatter: { status: { ne: "draft" } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            title
            topics
          }
        }
      }
    }
  }
`
