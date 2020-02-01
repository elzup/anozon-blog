import * as React from 'react'
import styled from 'styled-components'
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
} from 'react-share'
import { rhythm } from '../utils/typography'

type Props = {
  url: string
  title: string
  siteTitle: string
}

function ShareButtons({ title, url, siteTitle }: Props) {
  const titleWithHashtag = `${title} #${siteTitle}`

  return (
    <Style>
      <div>
        <TwitterShareButton url={url} title={titleWithHashtag}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <FacebookShareButton url={url} title={titleWithHashtag}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>
    </Style>
  )
}

const Style = styled.div`
  padding: 4px 0;
  h3 {
    margin-bottom: ${rhythm(1 / 4)};
  }
`

export default ShareButtons
