/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
const kebabCase = require( 'lodash/kebabCase')

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const SLUG_SEPARATOR = '___'

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogTemplate = path.resolve(`./src/templates/blog-post.tsx`)
  const tagTemplate = path.resolve('./src/templates/tags.tsx')

  return graphql(
    `
      {
        posts: allMarkdownRemark(
          filter: { frontmatter: { status: { ne: "draft" } } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
        tags: allMarkdownRemark(
          filter: { frontmatter: { status: { ne: "draft" } } }
          limit: 2000
        ) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.posts.edges

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
    const tags = result.data.tags.group

    tags.forEach(tag => {
      createPage({
        path: `/tags/${kebabCase(tag.fieldValue)}/`,
        component: tagTemplate,
        context: {
          tag: tag.fieldValue,
        },
      })
    })
  })
}

const getSlug = path => {
  const [_prefix, slug] = path.split(SLUG_SEPARATOR)

  return slug || path
}

exports.onCreateNode = ({ node, actions, getNode }) => {
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
