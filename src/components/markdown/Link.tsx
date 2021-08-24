import React from 'react'
import styled from 'styled-components'

const LinkBox = styled.div`
  border-left: solid 2px;
  padding-left: 0.5rem;
  p {
    margin: 0;
  }
`

type Props = React.ComponentPropsWithoutRef<'a'>
function Link({ href, children, ...other }: Props) {
  return (
    <LinkBox>
      <p>{children}</p>
      <a href={href} {...other}>
        {href}
      </a>
    </LinkBox>
  )
}

export default Link
