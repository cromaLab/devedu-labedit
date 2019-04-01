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

router.post('/', async (req, res, next) => {
  const { user, name } = req.body
  req.session.project = await generateProject(user, name)
  next()
})

/**
 *
 *
 * @type {express.RequestHandler}
 */
function verify (req, res, next) {
  if (!req.session.project) {
    res.render('project')
  } else load(req, res, next)
}

/**
 *
 *
 * @type {express.RequestHandler}
 */
function load (req, res, next) {
  res.locals.store = new Store(req.session.project.id)
  next()
}

/**
 *
 *
 * @param {string} user
 * @param {string} name
 */
async function generateProject (user, name) {
  const id = crypto.createHash('sha256').update(user).update(name).digest('hex')
  await new Store(id).create()
  return { user, name, id }
}

module.exports = { router, verify, load }
