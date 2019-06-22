const express = require('express')

const { SURVEY_URL } = process.env

/**
 *
 *
 * @type {express.Router}
 */
const router = express.Router()

router.get('/', (req, res) => {
  res.redirect(SURVEY_URL)
})

router.get('/complete', (req, res) => {
  req.session.survey = true
  res.redirect('../explorer')
})

/**
 *
 *
 * @type {express.RequestHandler}
 */
function verify (req, res, next) {
  if (!req.session.survey) {
    res.redirect(SURVEY_URL)
  } else next()
}

module.exports = { router, verify }
