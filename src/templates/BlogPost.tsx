import { graphql } from 'gatsby'
import * as React from 'react'
import {
  BlogPostBySlugQuery,
  SitePageContext,
} from '../../types/graphql-types.d'
import Bio from '../components/Bio'
import CommentArea from '../components/CommentArea'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import ShareButtons from '../components/ShareButtons'
import { TagChips } from '../components/TagChip'
import { rhythm, scale } from '../utils/typography'

type Props = {
  location: Location
  data: BlogPostBySlugQuery
  pageContext: SitePageContext
}

function BlogPostTemplate(props: Props) {
  const post = props.data.markdownRemark
  const { siteUrl } = props.data.site.siteMetadata
  const siteTitle = props.data.site.siteMetadata.title

  const { date, tags, title } = post.frontmatter

  const slug = props.pageContext.slug || ''
  const url = `${siteUrl}/${slug}`

  return (
    <Layout location={props.location} title={siteTitle} articleTitle={title}>
      <SEO title={title} description={post.excerpt} />
      <TagChips tags={tags.map((value) => ({ value }))} />

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
      <hr style={{ marginBottom: rhythm(1) }} />
      <TagChips tags={tags.map((value) => ({ value }))} />
      <CommentArea />
      <ShareButtons title={title} siteTitle={siteTitle} url={url} />
      <Bio />
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
        date(formatString: "YYYY-MM-DD")
        tags
      }
    }
  }
`
