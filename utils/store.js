const bodyParser = require('body-parser')
const express = require('express')
const fs = require('fs-extra')
const path = require('path')

const { STORE_DIR } = process.env

/**
 * Create a router that manages a user file store.
 * @param {boolean} write
 */
function createRouter (write) {
  const router = express.Router()
  const route = router.route('*')

  route.all(bodyParser.raw({ type: 'text/plain' }))

  route.all((req, res, next) => {
    res.locals.path = path.join(STORE_DIR, req.session.proj, req.path)
    next()
  })

  route.get((req, res, next) => {
    res.sendFile(res.locals.path, next)
  })

  if (write) {
    route.post(async (req, res, next) => {
      await fs.writeFile(res.locals.path, req.body).catch(next)
      res.status(204).end()
    })
  }

  return router
}

module.exports = createRouter
