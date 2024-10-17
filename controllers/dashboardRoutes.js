const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    console.log('User ID:', req.session.user_id); // Log the user ID

    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    console.log('Raw postData:', postData); // Log the raw postData

    const posts = postData.map((post) => post.get({ plain: true }));

    console.log('Processed posts:', posts); // Log the processed posts

    res.render('dashboard', {
      posts,
      loggedIn: true
    });
  } catch (err) {
    console.error('Error in dashboard route:', err);
    res.status(500).json(err);
  }
});

module.exports = router;