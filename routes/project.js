const express = require('express')

const Store = require('../utils/store')

const created = new Set()

/**
 *
 *
 * @type {express.Router}
 */
const router = express.Router()

router.get('/', (req, res) => {
  res.render('project')
})

router.post('/', (req, res, next) => {
  const { user, keyword } = req.body
  req.session.project = { user, keyword }
  res.redirect(req.app.get('redirect'))
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
  const store = new Store(user, keyword)
  if (!created.has(store.id)) {
    await store.create().catch(next)
    await store.touch('index.html').catch(next)
    created.add(store.id)
  }
  res.locals.store = store
  next()
}

module.exports = { router, verify, load }
