const withAuth = (req, res, next) => {
  console.log('Session data:', req.session);
  if (!req.session.logged_in) {
    console.log('User not logged in, redirecting to login page');
    res.redirect('/login');
  } else {
    console.log('User authenticated, proceeding to dashboard');
    next();
  }
};

module.exports = withAuth;