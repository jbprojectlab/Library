const router = require('express').Router()
const {Author, Comment, Story} = require('../db')

// GET /api/authors
router.get('/', (req, res, next) => {
  Author.findAll({
    attributes: ['id', 'name', 'imageUrl']
  })
    .then(authors => res.json(authors))
    .catch(next)
})

// GET /api/authors/:authorId
router.get('/:authorId', (req, res, next) => {
  Author.findById(req.params.authorId)
    .then(story => res.json(story))
    .catch(next)
})

// GET /api/authors/:authorId/comments
router.get('/:authorId/comments', (req, res, next) => {
  Comment.findAll({
    where: {
      authorId: req.params.authorId
    },
    include: [Author]
  })
    .then(comments => res.json(comments))
    .catch(next)
})

// GET /api/authors/:authorId/stories
router.get('/:authorId/stories', (req, res, next) => {
  Story.findAll({
    where: {
      authorId: req.params.authorId
    },
    include: [Author]
  })
    .then(stories => res.json(stories))
    .catch(next)
})

module.exports = router
