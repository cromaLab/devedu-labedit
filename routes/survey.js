const express = require('express')

/**
 *
 *
 * @type {express.Router}
 */
const router = express.Router()

router.get('/', (req, res) => {
  res.render('survey')
})

router.post('/', (req, res) => {
  req.session.survey = true
  res.redirect('back')
})

/**
 *
 *
 * @type {express.RequestHandler}
 */
function verify (req, res, next) {
  if (!req.session.survey) {
    res.render('survey')
  } else next()
}

module.exports = { router, verify }
