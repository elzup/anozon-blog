import * as React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import kebabCase from 'lodash/kebabCase'
import { button } from './common'

type Props = {
  value: string
  count?: number
}

const TagLink = styled(Link)`
  ${button}
`

function TagChip({ value, count }: Props) {
  return (
    <TagLink to={`/tags/${kebabCase(value)}`}>
      #{value}
      {count ? `(${count})` : ''}
    </TagLink>
  )
}

type GroupProps = { tags: Props[] }
export function TagChipsComponent({ tags }: GroupProps) {
  return (
    <>
      {tags.map((tag) => (
        <TagChip key={tag.value} value={tag.value} count={tag.count} />
      ))}
    </>
  )
}

const TagChipsStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  a:not(:first-child) {
    margin-left: 4px;
  }
`

const TagChipsColStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  a:not(:first-child) {
    margin-top: 4px;
  }
`

export const TagChips = (props: GroupProps) => (
  <TagChipsStyle>
    <TagChipsComponent {...props} />
  </TagChipsStyle>
)

export const TagChipsCol = (props: GroupProps) => (
  <TagChipsColStyle>
    <TagChipsComponent {...props} />
  </TagChipsColStyle>
)

export default TagChip
