'use strict'
const os = require('os')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const promisify = require('util.promisify')
const fetch = require('node-fetch')

/**
 * @param {Mozaik} mozaik
 */
const client = mozaik => {
  // mozaik.loadApiConfig(config)

  const apiCalls = {
    download: ({ url }) => {
      const hash = crypto.createHash('sha256')
      const urlHash = hash.update(url).digest('hex')
      const filePath = path.join(os.tmpdir(), urlHash)
      let content = null

      // Return content if already exists
      if (fs.existsSync(filePath)) {
        return promisify(fs.readFile)(filePath).then(content => {
          return { content: content.toString() }
        })
      }

      // Fetch content and return outpu
      mozaik.logger.info(`Download svg image from ${url} to ${filePath}`)
      return fetch(url)
        .then(res => res.text())
        .then(data => {
          content = data
          return promisify(fs.writeFile)(filePath, data)
        })
        .then(() => {
          return { content: content.toString() }
        })
    },
  }

  return apiCalls
}

module.exports = client
