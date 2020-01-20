import * as React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'

type Props = {
  value: string
  count?: number
}

const TagLink = styled(Link)`
  box-shadow: none;
  text-decoration: none;
  color: inherit;
  text-shadow: none;
  width: max-content;

  font-weight: 700;
  font-size: 0.66rem;
  white-space: nowrap;
  border: 3px solid #28242f;
  border-radius: 2rem;
  line-height: 1.8;
  padding: 0.1rem 0.5rem 0.05rem;
  background-image: none;
  &:hover {
    /* background: linear-gradient(90deg, #ff8a00, #e52e71); */
    background-image: linear-gradient(
      to right top,
      #1d437f,
      #605e97,
      #937caf,
      #c09ec7,
      #eac2e0
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    box-decoration-break: clone;
    border-color: #fff;
  }
`

function TagChip({ value, count }: Props) {
  return (
    <TagLink to={`/tags/${kebabCase(value)}`}>
      {value}
      {count ? `(${count})` : ''}
    </TagLink>
  )
}

type GroupProps = { tags: Props[] }
export function TagChipGroupsComponent({ tags }: GroupProps) {
  return (
    <>
      {tags.map(tag => (
        <TagChip key={tag.value} value={tag.value} count={tag.count} />
      ))}
    </>
  )
}

const TagChipGroupsStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  a:not(:first-child) {
    margin-left: 4px;
  }
`

const TagChipGroupsColStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  a:not(:first-child) {
    margin-top: 4px;
  }
`

export const TagChipGroups = (props: GroupProps) => (
  <TagChipGroupsStyle>
    <TagChipGroupsComponent {...props} />
  </TagChipGroupsStyle>
)

export const TagChipGroupsCol = (props: GroupProps) => (
  <TagChipGroupsColStyle>
    <TagChipGroupsComponent {...props} />
  </TagChipGroupsColStyle>
)

export default TagChip
