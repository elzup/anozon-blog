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
  padding: 0.5rem 1.2rem;
  font-size: 0.8rem;
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
  margin-top: 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  > span {
    ${button}
    color: white;
    background: #6b4ecf;
    border-color: #6b4ecf;
    font-weight: 700;
    &:hover {
      color: white;
      background: #6b4ecf;
      border-color: #6b4ecf;
      transform: none;
      box-shadow: none;
    }
  }
`

export default Pagination
