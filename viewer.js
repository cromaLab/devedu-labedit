const base = require('./utils/base')
const store = require('./utils/store')
const project = require('./routes/project')

const app = base('viewer')
app.use('/project', project.router)
app.use('/view', project.verify, store(false))

module.exports = app
