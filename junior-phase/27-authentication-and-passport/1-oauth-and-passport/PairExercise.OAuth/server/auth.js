const router = require('express').Router()
const {User} = require('./db')
const googleOAuthRouter = require('./oauth')
module.exports = router

router.use('/google', googleOAuthRouter)

router.get('/me', async (req, res, next) => {
  try {
    if (!req.session.userId) {
      if (req.user) {
        res.json(req.user)
      } else {
        res.sendStatus(401)
      }
    } else {
      const user = await User.findById(req.session.userId)
      if (!user) {
        res.sendStatus(401)
      } else {
        res.json(user)
      }
    }
  } catch (error) {
    next(error)
  }
})

router.put('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    })
    if (!user) {
      res.sendStatus(401)
    } else {
      // attach user id to the session
      req.session.userId = user.id
      res.json(user)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/logout', (req, res) => {
  // remove user id from session
  delete req.session.userId;
  if (req.user) {
    req.logout()
  }
  res.sendStatus(204)
})
