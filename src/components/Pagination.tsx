import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { button } from './common'

type Props = {
  current: number
  last: number
  prefix?: string
}

const Button = styled(Link)`
  ${button}
  border-radius: 4px;
  padding: 0 16px;
  margin: 0 2px;
`

const pagePath = (n: number) => (n === 1 ? '/' : `/page/${n}`)

type ButtonProps = {
  num: number
}

function Pagination({ current, last, prefix = '' }: Props) {
  // const nums = range(Math.max(1, current - 2), Math.min(current + 2, last) + 1)
  const prevNum = current !== 1 && current - 1
  const nextNum = current !== last && current + 1

  if (last === 1) return null

  return (
    <Style>
      {prevNum && <Button to={prefix + pagePath(prevNum)}>{'<<'}</Button>}
      <span>{current}</span>
      {nextNum && <Button to={prefix + pagePath(nextNum)}>{'>>'}</Button>}
    </Style>
  )
}

const Style = styled.div`
  display: flex;
  margin-top: 8px;
  justify-content: flex-end;
  > span {
    ${button}
    border-radius: 4px;
    margin: 0 2px;
    color: #937caf;
    border-color: #937caf;
    &:hover {
      color: #937caf;
      border-color: #937caf;
    }
  }
`

export default Pagination
