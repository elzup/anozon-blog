import * as React from 'react'
import Helmet from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'
import { MetaProps } from '../../types'
import { DefaultSeoQuery } from '../../types/graphql-types.d'

type Props = {
  title: string
  description?: string
  lang?: string
  meta?: MetaProps
  keywords?: string[]
}

function Seo({
  title,
  description,
  lang = 'ja',
  meta = [],
  keywords = [],
}: Props) {
  const data = useStaticQuery<DefaultSeoQuery>(detailsQuery)
  const metaDescription = description || data.site.siteMetadata.description
  const metas: MetaProps = [
    { name: `description`, content: metaDescription },
    { property: `og:title`, content: title },
    { property: `og:description`, content: metaDescription },
    { property: `og:type`, content: `website` },
    // { property: `og:image`, content: data.site.siteMetadata.image },
    { name: `twitter:card`, content: `summary` },
    {
      name: `twitter:creator`,
      content: data.site.siteMetadata.author,
    },
    { name: `twitter:title`, content: title },
    { name: `twitter:description`, content: metaDescription },
    ...meta,
  ]

  if (keywords.length > 0) {
    Object.assign(metas, { name: `keywords`, content: keywords.join(`, `) })
  }
  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`%s | ${data.site.siteMetadata.title}`}
      meta={metas}
    />
  )
}

export default Seo

const detailsQuery = graphql`
  query DefaultSeo {
    site {
      siteMetadata {
        title
        description
        author
        image
      }
    }
  }
`
