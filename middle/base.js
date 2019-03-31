const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan-debug')
const session = require('express-session')

const log = require('../utils/log')

const { SECRET, NODE_ENV } = process.env
const ProdEnv = NODE_ENV === 'production'

/**
 * Create a base router that logs and parses the request.
 * @param {string} name
 */
function createMiddleware (name) {
  const router = express.Router()

  // secure headers
  router.use(helmet())

  // enable request logging
  const format = ProdEnv ? 'combined' : 'dev'
  router.use(morgan(log(name), format))

  // parse request body
  router.use(express.json())
  router.use(express.urlencoded({ extended: false }))

  // retrieve session
  router.use(session({
    name: 'session',
    secret: SECRET + name,
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: ProdEnv,
      maxAge: 7200000, // 2 hours
      httpOnly: true
    }
  }))

  return router
}

module.exports = createMiddleware
