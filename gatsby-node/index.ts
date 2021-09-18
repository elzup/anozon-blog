/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path'
import { createFilePath } from 'gatsby-source-filesystem'
import { GatsbyNode } from 'gatsby'
import kebabCase from 'lodash/kebabCase'

// import { CreatePageQuery } from "./types/graphql-types.d"

const SLUG_SEPARATOR = '___'
// TODO: fix topics/:hoge/pages/:num
const CARD_PAR_PAGE = 50

type QueryResult = { posts: { edges: any[] }; topics: { group: any[] } }

export const createPages: GatsbyNode['createPages'] = ({
  graphql,
  actions,
}) => {
  const { createPage } = actions

  const blogTemplate = path.resolve(`./src/templates/BlogPost.tsx`)
  const tagTemplate = path.resolve('./src/templates/TagPage.tsx')

  return graphql<QueryResult>(`
    query CreatePage {
      posts: allMarkdownRemark(
        filter: { frontmatter: { published: { eq: true } } }
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            excerpt
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
      topics: allMarkdownRemark(
        filter: { frontmatter: { published: { eq: true } } }
        limit: 2000
      ) {
        group(field: frontmatter___topics) {
          fieldValue
          totalCount
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.posts.edges
    const numPages = Math.ceil(posts.length / CARD_PAR_PAGE)

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/page/${i + 1}`,
        component: path.resolve('./src/templates/BlogList.tsx'),
        context: {
          limit: CARD_PAR_PAGE,
          skip: i * CARD_PAR_PAGE,
          numPages,
          currentPage: i + 1,
        },
      })
    })

    posts.forEach((post, index) => {
      const previous =
        index === posts.length - 1 ? null : posts[Number(index) + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogTemplate,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    // Create tag pages
    const topics = result.data.topics.group

    topics.forEach((tag) => {
      const numPages = Math.ceil(tag.totalCount / CARD_PAR_PAGE)

      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path:
            `/topics/${kebabCase(tag.fieldValue)}/` +
            (i === 0 ? '' : `/page/${i + 1}`),
          component: tagTemplate,
          context: {
            tag: tag.fieldValue,
            limit: CARD_PAR_PAGE,
            skip: i * CARD_PAR_PAGE,
            numPages,
            currentPage: i + 1,
          },
        })
      })
    })
  })
}

const getSlug = (path: string) => {
  const [_prefix, slug] = path.split(SLUG_SEPARATOR)

  return slug || path
}

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions,
  getNode,
}) => {
  if (node.internal.type !== `MarkdownRemark`) return

  const { createNodeField } = actions
  const filePath = createFilePath({ node, getNode, trailingSlash: false })
  const slug = getSlug(filePath)

  createNodeField({
    name: `slug`,
    node,
    value: slug,
  })
}
