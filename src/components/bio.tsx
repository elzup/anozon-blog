import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import { BioDataQuery } from '../../types/graphql-types.d'

import { rhythm } from '../utils/typography'

type Props = {
  data: BioDataQuery
}
function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={(data: BioDataQuery) => {
        const { author, social } = data.site.siteMetadata

        return (
          <div
            style={{
              display: `flex`,
              marginBottom: rhythm(2.5),
            }}
          >
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                minWidth: 50,
                borderRadius: `100%`,
              }}
              imgStyle={{
                borderRadius: `50%`,
              }}
            />
            <p>
              <strong>{author}</strong> JavaScript とアニメ好き Web エンジニア。
              {` `}
              <a href={`https://twitter.com/${social.twitter}`}>Twitter</a>
            </p>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioData {
    avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

export default Bio
