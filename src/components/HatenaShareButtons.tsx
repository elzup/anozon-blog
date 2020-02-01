import * as React from 'react'
import styled from 'styled-components'

type Props = {
  title: string
  url: string
}
function HatenaShareButton({ title, url }: Props) {
  const hatebuUrl = `http://b.hatena.ne.jp/add?mode=confirm&url=${url}&title=${title}`

  return (
    <Style>
      <a
        className="HatenaShareButton"
        href={hatebuUrl}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <img
          src="https://b.st-hatena.com/images/v4/public/entry-button/button-only@2x.png"
          alt="このエントリーをはてなブックマークに追加"
          width="36"
          height="36"
        />
      </a>
    </Style>
  )
}

const Style = styled.div`
  width: 48px;
  height: 48px;
  background: #06a4de;

  a {
    font-family: Verdana;
    font-weight: bold;
    font-size: 2rem;
    color: white;
    text-decoration: none;
    text-align: center;
    img {
      width: 36px;
      height: 36px;
      margin: 6px;
      box-shadow: none;
    }
  }
`

export default HatenaShareButton
