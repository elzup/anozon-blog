import * as React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import { SideBarQuery } from '../../types/graphql-types.d'
import { TagChipsCol } from './Tagchip'

function SideBar() {
  return (
    <StaticQuery
      query={bioQuery}
      render={(data: SideBarQuery) => {
        const { tags } = data.allMarkdownRemark

        tags.sort((a, b) => b.totalCount - a.totalCount)

        return (
          <div>
            <h4>タグ</h4>
            <TagChipsCol
              tags={tags.map(v => ({
                value: v.fieldValue,
                count: v.totalCount,
              }))}
            />
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query SideBar {
    allMarkdownRemark(
      filter: { frontmatter: { status: { ne: "draft" } } }
      limit: 2000
    ) {
      tags: group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`

export default SideBar
