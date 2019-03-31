const express = require('express')
const path = require('path')

const base = require('./utils/base')
const store = require('./utils/store')
const project = require('./routes/project')
const survey = require('./routes/survey')

const app = base('editor')

app.get('/', (req, res) => res.redirect('/editor'))
app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.use('/project', project.router)
app.use('/survey', project.verify, survey.router)
app.use('/editor', project.verify, survey.verify,
  express.static(path.join(__dirname, 'editor')))

app.use('/files', project.verify, store())

module.exports = app
