import * as React from 'react'
import styled from 'styled-components'
import { TwitterShareButton, TwitterIcon } from 'react-share'
import { rhythm } from '../utils/typography'

type Props = {
  url: string
  title: string
}

function ShareButtons({ title, url }: Props) {
  return (
    <Style>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </Style>
  )
}

const Style = styled.div`
  h3 {
    margin-bottom: ${rhythm(1 / 4)};
  }
`

export default ShareButtons
