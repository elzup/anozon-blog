/* eslint-disable @typescript-eslint/no-var-requires */

require('ts-node').register({ files: true })

exports.createPages = require('./gatsby-node/index').createPages
exports.onCreateNode = require('./gatsby-node/index').onCreateNode
