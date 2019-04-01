const express = require('express')

/**
 *
 *
 * @type {express.Router}
 */
const router = express.Router()

router.post('/', async (req, res, next) => {
  await res.locals.store.touch(req.body.file).catch(next)
  next()
})

router.all('/', async (req, res, next) => {
  res.locals.project = req.session.project
  res.locals.files = await res.locals.store.ls().catch(next)
  res.render('explorer')
})

module.exports = { router }
