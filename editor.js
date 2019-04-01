const express = require('express')
const path = require('path')

const base = require('./utils/base')
const redirect = require('./utils/redirect')

const project = require('./routes/project')
const survey = require('./routes/survey')
const explorer = require('./routes/explorer')
const files = require('./routes/files')

const { VIEWER_BASEURL } = process.env

const app = base('editor')
app.set('viewer_baseurl', VIEWER_BASEURL)

app.get('/', (req, res) => res.redirect('/explorer'))
app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.use('/project', project.router)
app.post('/project', redirect('back'))
app.use(project.verify)

app.use('/survey', survey.router)
app.post('/survey', redirect('back'))
app.use(survey.verify)

app.use('/explorer', explorer.router)
app.use('/editor', express.static(path.join(__dirname, 'editor')))
app.use('/files', files.router)

module.exports = app
