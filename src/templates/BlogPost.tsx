import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import { rhythm, scale } from '../utils/typography'
import {
  BlogPostBySlugQuery,
  SitePageContext,
} from '../../types/graphql-types.d'
import { TagChips } from '../components/TagChip'
import ShareButtons from '../components/ShareButtons'

type Props = {
  location: Location
  data: BlogPostBySlugQuery
  pageContext: SitePageContext
}

function BlogPostTemplate(props: Props) {
  const post = props.data.markdownRemark
  const { siteUrl } = props.data.site.siteMetadata
  const siteTitle = props.data.site.siteMetadata.title
  const { previous, next } = props.pageContext

  const { date, tags, title } = post.frontmatter

  const slug = props.pageContext.slug || ''
  const url = `${siteUrl}/${slug}`

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title={title} description={post.excerpt} />
      <h1>{title}</h1>
      <TagChips tags={tags.map(value => ({ value }))} />
      <p
        style={{
          ...scale(-1 / 5),
          display: `block`,
          marginBottom: rhythm(1),
          marginTop: rhythm(0.5),
        }}
      >
        {date}
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <TagChips tags={tags.map(value => ({ value }))} />
      <ShareButtons title={title} siteTitle={siteTitle} url={url} />
      <Bio />

      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={'/' + previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={'/' + next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD HH:mm:ss")
        tags
      }
    }
  }
`
