import * as React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { rhythm } from '../utils/typography'
import { TagChips } from './Tagchip'

type Props = {
  tags: string[]
  slug: string
  title: string
  date: string
  excerpt: string
}

function ArticalCard({ title, tags, slug, date, excerpt }: Props) {
  return (
    <Style>
      <h3>
        <Link style={{ boxShadow: `none` }} to={`/${slug}`}>
          {title}
        </Link>
      </h3>
      <small>{date}</small>
      <p dangerouslySetInnerHTML={{ __html: excerpt }} />

      <TagChips tags={tags.map(value => ({ value }))} />
    </Style>
  )
}

const Style = styled.div`
  h3 {
    margin-bottom: ${rhythm(1 / 4)};
  }
`

export default ArticalCard
