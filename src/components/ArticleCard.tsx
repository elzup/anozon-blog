import * as React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { rhythm } from '../utils/typography'
import { TagChips } from './TagChip'

type Props = {
  topics: string[]
  slug: string
  title: string
  date: string
  excerpt: string
}

function ArticalCard({ title, topics, slug, date, excerpt }: Props) {
  return (
    <Style>
      <h3>
        <Link style={{ boxShadow: `none` }} to={`/${slug}`}>
          {title}
        </Link>
      </h3>
      <small>{date}</small>
      <p dangerouslySetInnerHTML={{ __html: excerpt }} />

      <TagChips topics={topics.map((value) => ({ value }))} />
    </Style>
  )
}

const Style = styled.div`
  border-bottom: solid 1px #d5d5d5;
  padding: 12px 0;
  h3 {
    margin-top: ${rhythm(1 / 4)};
    margin-bottom: ${rhythm(1 / 4)};
    border: none;
  }
`

export default ArticalCard
