const bodyParser = require('body-parser')
const express = require('express')

/**
 *
 *
 * @type {express.Router}
 */
const router = express.Router({
  caseSensitive: true,
  strict: true
})

router.use(bodyParser.raw({ type: 'text/plain' }))

router.get('*', (req, res, next) => {
  res.sendFile(res.locals.store.path(req.path))
})

router.post('*', (req, res, next) => {
  res.locals.store.write(req.path, req.body)
    .then(() => res.status(204).end())
    .catch(next)
})

module.exports = { router }
