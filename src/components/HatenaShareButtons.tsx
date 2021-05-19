import * as React from 'react'
import styled from 'styled-components'

type Props = {
  title: string
  url: string
  size: number
}
function HatenaShareButton({ title, url, size = 48 }: Props) {
  const hatebuUrl = `http://b.hatena.ne.jp/add?mode=confirm&url=${url}&title=${title}`

  return (
    <Style size={size}>
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

const Style = styled.div<{ size: number }>`
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  background: #06a4de;

  a {
    font-family: Verdana;
    font-weight: bold;
    font-size: 2rem;
    color: white;
    text-decoration: none;
    text-align: center;
    background-image: none;
    img {
      width: ${(p) => (p.size * 3) / 4}px;
      height: ${(p) => (p.size * 3) / 4}px;
      margin: ${(p) => (p.size - (p.size * 3) / 4) / 2}px;
      box-shadow: none;
    }
  }
`

export default HatenaShareButton
