const express = require('express')
const path = require('path')

const base = require('./utils/base')
const project = require('./routes/project')
const survey = require('./routes/survey')
const explorer = require('./routes/explorer')
const files = require('./routes/files')

const app = base('editor')

app.get('/', (req, res) => res.redirect('/editor'))
app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.use('/project', project.router)
app.use(project.verify)

app.use('/survey', survey.router)
app.use(survey.verify)

app.use('/explorer', explorer.router)
app.use('/editor', express.static(path.join(__dirname, 'editor')))
app.use('/files', files.router)

module.exports = app
