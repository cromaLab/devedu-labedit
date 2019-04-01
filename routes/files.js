const bodyParser = require('body-parser')
const express = require('express')

/**
 *
 *
 * @type {express.Router}
 */
const router = express.Router({ strict: true })

router.use(bodyParser.raw({ type: 'text/plain' }))

router.get('*', (req, res, next) => {
  res.sendFile(req.session.project.absolutePath(req.path), next)
})

router.post('*', async (req, res, next) => {
  try {
    await req.session.project.writeFile(req.path, req.body)
    res.status(204).end()
  } catch (e) {
    next(e)
  }
})

module.exports = { router }
