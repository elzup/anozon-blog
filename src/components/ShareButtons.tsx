import * as React from 'react'
import styled from 'styled-components'
import {
  TwitterShareButton,
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

const XIcon = () => (
  <svg viewBox="0 0 48 48" width="48" height="48">
    <circle cx="24" cy="24" r="24" fill="#000" />
    <path
      d="M26.67 22.12L33.84 14h-1.7l-6.22 7.05L20.68 14H14l7.51 10.68L14 33h1.7l6.57-7.45L28.32 33H35l-7.79-10.88h-.54zm-2.33 2.64l-.76-1.06L16.38 15.3h2.6l4.89 6.82.76 1.06 6.36 8.87h-2.6l-5.19-7.25-.76-.04z"
      fill="#fff"
    />
  </svg>
)

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
      <span className="label">Share</span>
      <div className="buttons">
        <TwitterShareButton url={url} title={titleWithHashtag}>
          <XIcon />
        </TwitterShareButton>
        <FacebookShareButton url={url} title={titleWithHashtag}>
          <FacebookIcon size={48} round />
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

  .label {
    font-weight: 700;
    font-size: 0.85rem;
    color: #8e82a6;
  }

  .buttons {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 10px;

    > button,
    > div {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;
      border: none;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      background: none;

      &:hover {
        transform: scale(1.1);
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
      }

      svg, img {
        display: block;
        box-shadow: none !important;
        border-radius: 0;
        margin: 0;
      }
    }
  }

  button.link {
    background: #6b4ecf;
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
