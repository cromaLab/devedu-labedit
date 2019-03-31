const express = require('express')
const path = require('path')
const base = require('./middle/base')

const app = express()
app.set('view engine', 'hbs')
app.use(base('editor'))

app.get('/', (req, res) => res.render('index'))
app.use('/assets', express.static(path.join(__dirname, 'assets')))

// TODO

module.exports = app
