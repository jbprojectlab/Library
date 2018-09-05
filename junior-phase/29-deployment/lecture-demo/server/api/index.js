const router = require('express').Router()

router.use('/users', require('./user.router'))

router.use('/stories', require('./story.router'))

module.exports = router
