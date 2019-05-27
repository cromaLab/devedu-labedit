const express = require('express')
const base = require('./utils/base')

const files = require('./routes/files')
const project = require('./routes/project')

const app = base('viewer')
app.set('redirect', '../view/index.html')

app.use('/project', project.router)
app.use(project.verify)

const router = express.Router()
router.get('*', files.router)
app.use('/view', router)

module.exports = app
