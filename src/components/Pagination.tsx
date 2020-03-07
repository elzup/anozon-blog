import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { button } from './common'

type Props = {
  current: number
  last: number
}

const Button = styled(Link)`
  ${button}
  border-radius: 4px;
  padding-left: 8px;
  padding-right: 8px;
  margin-left: 2px;
  margin-right: 2px;
  &[data-large='true'] {
    padding-left: 16px;
    padding-right: 16px;
  }
  &[data-disabled='true'] {
    border-color: #937caf;
  }
`

const pagePath = (n: number) => (n === 1 ? '/' : `/page/${n}`)

type ButtonProps = {
  label: string
  num: number
  large?: boolean
  disabled?: boolean
}
const PagingButton = ({
  num,
  label,
  large = false,
  disabled = false,
}: ButtonProps) => (
  <Button to={pagePath(num)} data-large={large} data-disabled={disabled}>
    {label}
  </Button>
)

function Pagination({ current, last }: Props) {
  // const nums = range(Math.max(1, current - 2), Math.min(current + 2, last) + 1)
  const prevNum = current !== 1 && current - 1
  const nextNum = current !== last && current + 1

  return (
    <Style>
      {prevNum && <PagingButton num={prevNum} label="<<" large />}
      <PagingButton key={current} num={current} label={`${current}`} disabled />
      {nextNum && <PagingButton num={prevNum} label=">>" large />}
    </Style>
  )
}

const Style = styled.div`
  display: flex;
  margin-top: 8px;
  justify-content: flex-end;
`

export default Pagination
