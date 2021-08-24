import React, { createElement } from 'react'
import rehypeReact from 'rehype-react'
import { unified } from 'unified'
import Link from './Link'

export const processor = unified().use(rehypeReact, {
  createElement: createElement,
  components: {
    a: Link,
  },
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderAst = (ast: any): Element => {
  return (processor.stringify(ast) as unknown) as Element
}
