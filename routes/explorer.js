const express = require('express')

/**
 *
 *
 * @type {express.Router}
 */
const router = express.Router()

router.post('/', async (req, res, next) => {
  const {file} = req.body
  try {
    if (file) {
      await res.locals.store.touch(file)
    }
    next()
  } catch (err) {
    next(err)
  }
})

router.all('/', async (req, res, next) => {
  res.locals.project = req.session.project
  try {
    res.locals.files = await res.locals.store.ls()
    res.render('explorer')
  } catch (err) {
    next(err)
  }
})

module.exports = { router }
