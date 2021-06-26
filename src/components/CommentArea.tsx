import React from 'react'
import { useUtterances } from './useUtterances'

const CommentArea = () => {
  const [ref] = useUtterances()

  return <div ref={ref} className="comments"></div>
}

export default CommentArea
