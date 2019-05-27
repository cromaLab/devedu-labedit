const debug = require('debug')

const { APP_NAME } = process.env

const log = debug(APP_NAME)

/**
 *
 *
 * @param {string} namespace
 */
function extend (namespace) {
  return log.extend(namespace)
}

module.exports = extend
