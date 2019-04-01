const express = require('express')
const crypto = require('crypto')

const Store = require('../utils/store')

/**
 *
 *
 * @type {express.Router}
 */
const router = express.Router()

router.get('/', (req, res) => {
  res.render('project')
})

router.post('/', (req, res) => {
  const { user, name } = req.body
  req.session.project = new Store(generateId(user, name))
  res.redirect('back')
})

/**
 *
 *
 * @type {express.RequestHandler}
 */
function verify (req, res, next) {
  if (!req.session.project) {
    res.render('project')
  } else next()
}

/**
 *
 *
 * @param {string} user
 * @param {string} name
 */
function generateId (user, name) {
  return crypto.createHash('sha256').update(user).update(name).digest('hex')
}

module.exports = { router, verify }
