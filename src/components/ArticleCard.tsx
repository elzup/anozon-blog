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
  padding: 20px 24px;
  margin-bottom: 16px;
  border-radius: 12px;
  border: 1px solid #e8e0f4;
  background: white;
  transition: all 0.25s ease;
  &:hover {
    border-color: #c4b5e3;
    box-shadow: 0 4px 20px rgba(91, 74, 138, 0.1);
    transform: translateY(-2px);
  }
  h3 {
    margin-top: 0;
    margin-bottom: ${rhythm(1 / 4)};
    border: none;
    a {
      color: #2d2252;
      transition: color 0.2s ease;
      &:hover {
        color: #6b4ecf;
      }
    }
  }
  small {
    color: #8e82a6;
    font-size: 0.8rem;
  }
  p {
    color: #555;
    line-height: 1.7;
    margin-bottom: ${rhythm(1 / 4)};
  }
`

export default ArticalCard
