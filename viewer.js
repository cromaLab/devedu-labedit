const express = require('express')

const base = require('./utils/base')
const redirect = require('./utils/redirect')

const files = require('./routes/files')
const project = require('./routes/project')

const app = base('viewer')
app.use('/project', project.router)
app.post('/project', redirect('view'))
app.use(project.verify)

const router = express.Router()
router.get('*', files.router)
app.use('/view', router)

module.exports = app
