const express = require('express')
const crypto = require('crypto')

const log = require('../utils/log')('project')

/**
 *
 *
 * @type {express.Router}
 */
const router = express.Router()

router.get('/', verify)
router.post('/', (req, res) => {
  const { user, name } = req.body
  req.session.project = generateProject(user, name)
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
function generateProject (user, name) {
  const id = crypto.createHash('sha256').update(user).update(name).digest('hex')
  log(`Generating project ${id}`)
  return { user, name, id }
}

module.exports = { router, verify }
