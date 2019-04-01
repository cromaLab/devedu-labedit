const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan-debug')
const session = require('express-session')

const log = require('../utils/log')

const { SECRET, NODE_ENV } = process.env

/**
 * Create a base app that logs and parses the request.
 * @param {string} name
 */
function createBase (name) {
  const app = express()

  // config
  app.set('view engine', 'hbs')
  if (NODE_ENV === 'production') { app.set('trust proxy', 1) }

  // secure headers
  app.use(helmet())

  // enable request logging
  const format = NODE_ENV === 'production' ? 'combined' : 'dev'
  app.use(morgan(log(name), format))

  // parse request body
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  // retrieve session
  app.use(session({
    name: name + '_session',
    secret: name + SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      // secure: NODE_ENV === 'production',
      httpOnly: true
    }
  }))

  return app
}

module.exports = createBase
