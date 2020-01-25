import * as React from 'react'
import { graphql } from 'gatsby'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import { IndexPageQuery } from '../../types/graphql-types.d'
import ArticalCard from '../components/ArticleCard'

type Props = {
  data: IndexPageQuery
  location: Location
}

function BlogIndex({ data, location }: Props) {
  const { title } = data.site.siteMetadata
  const { edges } = data.posts

  return (
    <Layout location={location} title={title}>
      <SEO
        title="All posts"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />
      <Bio />
      {edges.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug

        return (
          <ArticalCard
            key={node.fields.slug}
            title={title}
            slug={node.fields.slug}
            excerpt={node.excerpt}
            date={node.frontmatter.date}
            tags={node.frontmatter.tags}
          />
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexPage {
    site {
      siteMetadata {
        title
      }
    }
    posts: allMarkdownRemark(
      filter: { frontmatter: { status: { ne: "draft" } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
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
            tags
          }
        }
      }
    }
  }
`
