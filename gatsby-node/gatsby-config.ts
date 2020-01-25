import { IndexPageQuery } from './../types/graphql-types.d'
/* eslint-disable @typescript-eslint/camelcase */

const siteMetadata = {
  title: `あのぞんブログ`,
  author: `anozon`,
  profile: 'JavaScript とアニメ好き Web エンジニア。',
  description: `フロントエンド中心のブログ`,
  siteUrl: `https://blog.anozon.me/`,
  social: {
    twitter: `anozon`,
  },
} as const

export type SiteMetaData = typeof siteMetadata

const feedsQuery = `
{
  posts: allMarkdownRemark(
    filter: { frontmatter: { status: { ne: "draft" } } },
    sort: { order: DESC, fields: [frontmatter___date] },
  ) {
    edges {
      node { excerpt, html, fields { slug }, frontmatter { title date } }
    }
  }
}
`

// protect PCDATA invalid
const trimXmlIllegalChar = (s: string) =>
  s.replace(
    /[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm,
    ''
  )

export default {
  siteMetadata,
  plugins: [
    'gatsby-plugin-catch-links',

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/../content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/../content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `@raae/gatsby-remark-oembed`,
            options: {
              usePrefix: ['oembed', 'video'],
              providers: { exclude: [] },
            },
          },
          {
            resolve: 'gatsby-remark-embed-gist',
            options: { username: 'elzup', includeDefaultCss: true },
          },
          'gatsby-remark-prismjs-title',
          {
            resolve: `gatsby-remark-images`,
            options: { maxWidth: 690, quality: 90, linkImagesToOriginal: true },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          'gatsby-plugin-twitter',
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {
                js: 'javascript',
                sh: 'bash',
                scss: 'css',
              },
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: 'superscript',
                  extend: 'javascript',
                  definition: { superscript_types: /(SuperType)/ },
                  insertBefore: {
                    function: { superscript_keywords: /(superif|superelse)/ },
                  },
                },
              ],
              prompt: { user: 'root', host: 'localhost', global: false },
              escapeEntities: {},
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: { trackingId: 'UA-49286104-10' },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            serialize: ({
              query: {
                posts: { edges },
              },
            }: {
              query: IndexPageQuery
            }) => {
              return edges.map(({ node: { fields, frontmatter, excerpt } }) => {
                const url = `${siteMetadata.siteUrl}/${fields.slug}`

                return Object.assign({}, frontmatter, {
                  description: excerpt,
                  date: frontmatter.date,
                  url,
                  guid: url,
                  custom_elements: [
                    { 'content:encoded': trimXmlIllegalChar(excerpt) },
                  ],
                })
              })
            },
            query: feedsQuery,
            output: '/rss.xml',
            title: 'anozon blog all RSS Feed',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteMetadata.title,
        short_name: siteMetadata.title,
        start_url: `/`,
        background_color: `#f9f7f7`,
        theme_color: `#112d4e`,
        display: `minimal-ui`,
        icon: `content/assets/profile-pic.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {},
    },
    `gatsby-plugin-typescript`,
    {
      resolve: 'gatsby-plugin-graphql-codegen',
      options: {
        fileName: `types/graphql-types.d.ts`,
        documentPaths: [
          './src/**/*.{ts,tsx}',
          './.cache/fragments/*.js',
          './node_modules/gatsby-*/**/*.js',
          './gatsby-node/index.ts',
        ],
      },
    },
    'gatsby-plugin-sass',
  ],
}
