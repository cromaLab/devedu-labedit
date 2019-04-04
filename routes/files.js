const express = require('express')

/**
 *
 *
 * @type {express.Router}
 */
const router = express.Router({
  caseSensitive: true,
  strict: true
})

router.get('*', (req, res, next) => {
  res.sendFile(res.locals.store.path(req.path))
})

router.post('*', async (req, res, next) => {
  const { content, actions } = req.body
  try {
    await res.locals.store.write(req.path, content)
    if (actions) await res.locals.store.actions(req.path, actions)
    res.status(204).end()
  } catch (e) {
    next(e)
  }
})

module.exports = { router }
