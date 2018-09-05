const router = require('express').Router()

const HttpError = require('../utils/HttpError')
const User = require('../db/user.model')
const Story = require('../db/story.model')
const gatekeepers = require('../utils/gatekeeper.middleware');

// for any /users/:id routes, this piece of middleware
// will be executed, and put the user on `req.requestedUser`
router.param('id', (req, res, next, id) => {
  User.findById(id)
    .then((user) => {
      if (!user) throw HttpError(404)
      req.requestedUser = user
      next()
      return null
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
  User.findAll({})
    .then((users) => {
      res.json(users)
    })
    .catch(next)
})

router.post('/', gatekeepers.admin, gatekeepers.removeAdminUpdate, (req, res, next) => {
  User.create(req.body)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch(next)
})

router.get('/:id', gatekeepers.loggedIn, (req, res, next) => {
  req.requestedUser.reload({
    include: [{
      model: Story,
      attributes: {exclude: ['paragraphs']}
    }]
  })
    .then((requestedUser) => {
      res.json(requestedUser)
    })
    .catch(next)
})

router.put('/:id', gatekeepers.sameUserOrAdmin, gatekeepers.removeAdminUpdate, (req, res, next) => {
  req.requestedUser.update(req.body)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
})

router.delete('/:id', gatekeepers.sameUserOrAdmin, (req, res, next) => {
  req.requestedUser.destroy()
    .then(() => {
      res.status(204).end()
    })
    .catch(next)
})

module.exports = router
