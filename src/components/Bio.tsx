import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Image, { FixedObject } from 'gatsby-image'
import styled from 'styled-components'
import { BioDataQuery } from '../../types/graphql-types.d'

import { rhythm } from '../utils/typography'

type Props = {
  fixed: FixedObject
  twitter: string
  author: string
  profile: string
}
function Bio({ fixed, author, profile, twitter }: Props) {
  return (
    <Style>
      <Image fixed={fixed} alt={author} />
      <p>
        <strong>{author}</strong> {profile}
        <a href={`https://twitter.com/${twitter}`}>Twitter</a>
      </p>
    </Style>
  )
}
const Style = styled.div`
  display: flex;
  margin-bottom: ${rhythm(2.5)};
  .gatsby-image-wrapper {
    margin-right: ${rhythm(1 / 2)};
    margin-bottom: 0;
    min-width: 50px;
    border-radius: 100%;
    > img {
      border-radius: 50%;
    }
  }
`

function BioContainer() {
  const data = useStaticQuery<BioDataQuery>(bioQuery)

  return (
    <Bio
      fixed={data.avatar.childImageSharp.fixed}
      profile={data.site.siteMetadata.profile}
      author={data.site.siteMetadata.author}
      twitter={data.site.siteMetadata.social.twitter}
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
        profile
        social {
          twitter
        }
      }
    }
  }
`

export default BioContainer
