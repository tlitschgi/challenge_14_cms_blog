const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const homeRoutes = require('./controllers/homeRoutes.js');
const authRoutes = require('./controllers/authRoutes.js');
const dashboardRoutes = require('./controllers/dashboardRoutes.js');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Set up sessions
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(routes);

app.use('/', homeRoutes);
app.use('/', authRoutes);
app.use('/', dashboardRoutes);

app.get('/dashboard', (req, res) => {
  res.send('Dashboard Page');
});

app.get('/login', (req, res) => {
  res.render('login'); // Assuming you have a login view
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});