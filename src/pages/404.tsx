import * as React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { Site404Query } from '../../types/graphql-types.d'

type Props = {
  data: Site404Query
  location: Location
}
function NotFoundPage(props: Props) {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="404: Not Found" />
      <h1>Not Found</h1>
      <p>404個のドーナッツ</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query Site404 {
    site {
      siteMetadata {
        title
      }
    }
  }
`
