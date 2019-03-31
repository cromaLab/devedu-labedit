const express = require('express')
const base = require('./middle/base')

const app = express()
app.use(base('viewer'))

// TODO

module.exports = app
