const express = require('express')

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
  const { user, keyword } = req.body
  req.session.project = { user, keyword }
  const store = new Store(user, keyword)

  try {
    await store.create()
    res.redirect(req.app.get('redirect'))
  } catch (e) {
    next(e)
  }
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
async function load (req, res, next) {
  const { user, keyword } = req.session.project
  res.locals.store = new Store(user, keyword)
  next()
}

module.exports = { router, verify, load }
