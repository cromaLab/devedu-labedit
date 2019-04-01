const express = require('express') // eslint-disable-line no-unused-vars

/**
 *
 * @param {string} location
 * @return {express.RequestHandler}
 */
function redirect (location) {
  return (req, res, next) => {
    res.redirect(location)
  }
}

module.exports = redirect
