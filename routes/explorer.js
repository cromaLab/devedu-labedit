const express = require('express')

/**
 *
 *
 * @type {express.Router}
 */
const router = express.Router()

router.get('/', (req, res) => {
  res.render('explorer')
})

module.exports = { router }
