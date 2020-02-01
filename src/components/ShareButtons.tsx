import * as React from 'react'
import styled from 'styled-components'
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
} from 'react-share'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import copy from 'clipboard-copy'
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
      この記事を共有する
      <div>
        <TwitterShareButton url={url} title={titleWithHashtag}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <FacebookShareButton url={url} title={titleWithHashtag}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <button
          onClick={() => {
            const fullText = titleWithHashtag + ' ' + url

            copy(fullText)
            console.log(titleWithHashtag + ' ' + url)
          }}
        >
          <FontAwesomeIcon color={'white'} icon={faLink} />
        </button>
      </div>
      <textarea value={titleWithHashtag + ' ' + url} disabled></textarea>
    </Style>
  )
}

const Style = styled.div`
  padding: 4px 0;
  > div {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 4px;
    grid-template-columns: max-content max-content;
  }
  textarea {
    font-size: ${rhythm(1 / 2)};
    line-height: ${rhythm(3 / 4)};
    width: 100%;
    margin: 8px 0;
    padding: 4px 8px;
    background: #f0f0f0;
    border-radius: 4px;
    border: none;
    resize: none;
    overflow: hidden;
  }
  h3 {
    margin-bottom: ${rhythm(1 / 4)};
  }
`

export default ShareButtons
