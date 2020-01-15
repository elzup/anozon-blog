import * as React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { MarkdownRemarkGroupConnection } from '../../types/graphql-types.d'

type Tag = Pick<MarkdownRemarkGroupConnection, 'fieldValue' | 'totalCount'>

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
  padding: 0.2rem 0.85rem 0.25rem;
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

function TagChip({ tag }: { tag: Tag }) {
  return (
    <TagLink to={`/tags/${tag.fieldValue}`}>
      {tag.fieldValue}({tag.totalCount})
    </TagLink>
  )
}

export default TagChip
