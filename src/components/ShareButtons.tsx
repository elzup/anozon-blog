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
import Tooltip from 'rc-tooltip'
import { rhythm } from '../utils/typography'
import 'rc-tooltip/assets/bootstrap.css'
import HatenaShareButton from './HatenaShareButtons'

type Props = {
  url: string
  title: string
  siteTitle: string
}

function ShareButtons({ title, url, siteTitle }: Props) {
  const titleWithHashtag = `${title} #${siteTitle}`
  const fullText = titleWithHashtag + ' ' + url

  return (
    <Style>
      この記事を共有する
      <div>
        <TwitterShareButton url={url} title={titleWithHashtag}>
          <TwitterIcon size={48} />
        </TwitterShareButton>
        <FacebookShareButton url={url} title={titleWithHashtag}>
          <FacebookIcon size={48} />
        </FacebookShareButton>
        <HatenaShareButton url={url} title={title} size={48} />
        <Tooltip
          placement="top"
          trigger={'click'}
          destroyTooltipOnHide
          overlay={<span>Copied!!</span>}
        >
          <button className="link" onClick={() => copy(fullText)}>
            <FontAwesomeIcon color={'white'} icon={faLink} />
          </button>
        </Tooltip>
      </div>
      <textarea value={titleWithHashtag + ' ' + url} disabled></textarea>
    </Style>
  )
}

const Style = styled.div`
  margin: 1rem 0;
  padding: 4px 0;
  border-top: solid black 4px;
  border-bottom: solid black 4px;
  border-image: linear-gradient(to right, #bc37b8 0%, #002dae 100%);
  border-image-slice: 1;

  button.link {
    height: 48px;
    width: 48px;
    border: none;
    background: lightgray;
  }
  > div {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 4px;
    grid-template-columns: max-content max-content max-content;
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
