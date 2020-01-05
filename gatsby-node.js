const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const SLUG_SEPARATOR = '___'

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  return graphql(
    `
      {
        allMarkdownRemark(
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
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
  })
}

const getSlug = path => {
  const [prefix, slug] = path.split(SLUG_SEPARATOR)
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
