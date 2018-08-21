const express = require('express');
const router = express.Router();

const Article = require('../models/article');

/**
 *
 *___ _____ _   ___ _____   _  _ ___ ___ ___
 / __|_   _/_\ | _ \_   _| | || | __| _ \ __|
 \__ \ | |/ _ \|   / | |   | __ | _||   / _|
 |___/ |_/_/ \_\_|_\ |_|   |_||_|___|_|_\___|
 *
 *
 */

router.get('/articles', async (req, res, next) => {
  try {
    const articles = await Article.findAll();
    res.json(articles);
  } catch (error) {
    next(error);
  }
});

router.get('/articles/:theId', async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.theId);
    if (article) {
      res.json(article);
    } else {
      const error = new Error('Article of that id not found in the database');
      error.status = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

router.post('/articles', async (req, res, next) => {
  try {
    const article = await Article.create(req.body);
    res.json({
      message: 'Created successfully',
      article
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
