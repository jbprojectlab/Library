const router = require('express').Router()
const {Story, Author, Comment} = require('../db')

// GET /api/stories
router.get('/', (req, res, next) => {
  Story.findAll({
    where: req.query,
    attributes: ['id', 'title'],
    include: [Author]
  })
    .then(stories => res.json(stories))
    .catch(next)
})

// GET /api/stories/:storyId
router.get('/:storyId', (req, res, next) => {
  Story.findById(req.params.storyId, {
    include: [Author, {model: Comment, include: Author}]
  })
    .then(story => res.json(story))
    .catch(next)
})

module.exports = router
