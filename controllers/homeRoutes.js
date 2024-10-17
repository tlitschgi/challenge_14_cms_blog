const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// GET all posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment }
      ],
      attributes: ['id', 'title', 'content', 'created_at']
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    
    console.log('Posts:', posts);
    
    res.render("homepage", { posts });
  } catch (err) {
    console.error('Error in home route:', err);
    res.status(500).json(err);
  }
});

module.exports = router;