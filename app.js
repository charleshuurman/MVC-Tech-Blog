const express = require('express');
const session = require('express-session'); // Import express-session
const expressHandlebars = require('express-handlebars'); // Import express-handlebars
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access'); // Import allowInsecurePrototypeAccess
const Handlebars = require('handlebars'); // Import Handlebars
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelize } = require('./models');
const homeRoutes = require('./routes/homeRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const blogpostRoutes = require('./routes/blogpostRoutes'); 
const commentRoutes = require('./routes/commentRoutes');
//const methodOverride = require('method-override');
const moment = require('moment'); // Import moment

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.use(express.static('public'));

// Set up Handlebars with allowInsecurePrototypeAccess
const hbs = expressHandlebars.create({
    defaultLayout: 'main',
    extname: '.handlebars',
    partialsDir: 'views/partials',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
        formatDate: function(date) {
            return moment(date).format('MMMM Do YYYY, h:mm:ss a');
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true })); // Parse request body

// app.use(methodOverride('_method'));

// Configure session middleware
app.use(session({
    secret: 'Sonas-Lau2', 
    store: new SequelizeStore({
        db: sequelize,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

app.use('/', homeRoutes);
app.use('/', authRoutes);
app.use('/', dashboardRoutes); 
app.use('/', blogpostRoutes);
app.use('/', commentRoutes);

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
});
