import React, { useEffect } from 'react'

export function useUtterances() {
  const ref = React.createRef<HTMLDivElement>()

  useEffect(() => {
    if (!ref.current) return
    const scriptEl = document.createElement('script')

    scriptEl.async = true
    scriptEl.src = 'https://utteranc.es/client.js'
    scriptEl.setAttribute('repo', 'elzup/anozon-blog')
    scriptEl.setAttribute('issue-term', 'title')
    scriptEl.setAttribute('theme', 'github-light')
    scriptEl.setAttribute('label', 'blog-comment')
    scriptEl.setAttribute('crossorigin', 'anonymous')
    scriptEl.setAttribute('async', '')
    ref.current.appendChild(scriptEl)
  }, [!ref.current])
  return [ref] as const
}
