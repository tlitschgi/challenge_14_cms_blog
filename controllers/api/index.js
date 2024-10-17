const router = require('express').Router();

//const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commenttRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commenttRoutes);

module.exports = router;
