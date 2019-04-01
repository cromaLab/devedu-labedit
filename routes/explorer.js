const express = require('express')

/**
 *
 *
 * @type {express.Router}
 */
const router = express.Router()

router.get('/', (req, res) => {
  const { project } = req.session
  res.render('explorer', { project })
})

router.post('/*', (req, res) => {
  res.locals.store.touch(req.path)
  res.redirect(`../editor/?file=${req.path}`)
})

module.exports = { router }
