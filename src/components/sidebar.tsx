import * as React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import { SideBarQuery } from '../../types/graphql-types.d'
import { TagChipsCol } from './tagchip'

function SideBar() {
  return (
    <StaticQuery
      query={bioQuery}
      render={(data: SideBarQuery) => {
        const { tags, categories } = data.allMarkdownRemark

        tags.sort((a, b) => b.totalCount - a.totalCount)
        categories.sort((a, b) => b.totalCount - a.totalCount)

        return (
          <div>
            <h4>カテゴリー</h4>
            <div>
              <div style={{ display: 'grid' }}>
                {categories.map(category => (
                  <Link
                    key={category.fieldValue}
                    style={{
                      boxShadow: `none`,
                      textDecoration: `none`,
                      color: `inherit`,
                      width: 'max-content',
                    }}
                    to={`/category/${category.fieldValue}`}
                  >
                    {category.fieldValue}({category.totalCount})
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4>タグ</h4>
              <TagChipsCol
                tags={tags.map(v => ({
                  value: v.fieldValue,
                  count: v.totalCount,
                }))}
              />
            </div>
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
      categories: group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`

export default SideBar