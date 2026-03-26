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
  align-items: center;
  gap: 12px;
  .gatsby-image-wrapper {
    margin-bottom: 0;
    min-width: 56px;
    border-radius: 100%;
    box-shadow: 0 2px 12px rgba(91, 74, 138, 0.2);
    transition: transform 0.3s ease;
    &:hover {
      transform: rotate(8deg) scale(1.1);
    }
    > img {
      border-radius: 50%;
    }
  }
  p {
    font-size: 0.85rem;
    line-height: 1.6;
    color: #444;
    margin: 0;
  }
  strong {
    color: #2d2252;
  }
  a {
    color: #6b4ecf;
    font-weight: 600;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition: border-color 0.2s ease;
    &:hover {
      border-bottom-color: #6b4ecf;
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
          base64
          width
          height
          src
          srcSet
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
