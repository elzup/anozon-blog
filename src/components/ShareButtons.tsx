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
  margin: 1.5rem 0;
  padding: 20px;
  border-radius: 12px;
  background: linear-gradient(135deg, #f8f5ff 0%, #f0ecf9 100%);
  border: 1px solid #e0d6f6;

  button.link {
    height: 48px;
    width: 48px;
    border: none;
    background: #6b4ecf;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
      background: #5538b5;
      transform: scale(1.1);
    }
  }
  > div {
    display: flex;
    gap: 8px;
    margin-top: 8px;
    button, > div {
      border-radius: 50%;
      overflow: hidden;
      transition: transform 0.2s ease;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  textarea {
    font-size: ${rhythm(1 / 2)};
    line-height: ${rhythm(3 / 4)};
    width: 100%;
    margin: 12px 0 0;
    padding: 8px 12px;
    background: white;
    border-radius: 8px;
    border: 1px solid #e0d6f6;
    resize: none;
    overflow: hidden;
    color: #666;
  }
`

export default ShareButtons
