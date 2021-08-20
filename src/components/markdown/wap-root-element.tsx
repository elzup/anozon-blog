import { MDXProvider } from '@mdx-js/react'
import React from 'react'
import Link from './Link'

const CustomMdxProvider: React.FC = ({ children }) => {
  return (
    <MDXProvider
      components={{
        link: Link,
      }}
    >
      {children}
    </MDXProvider>
  )
}

export default CustomMdxProvider
