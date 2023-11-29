const express = require('express');
const session = require('express-session'); // Import express-session
const { engine } = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelize } = require('./models');
const homeRoutes = require('./routes/homeRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const blogpostRoutes = require('./routes/blogpostRoutes'); 
//const methodOverride = require('method-override');


const app = express();

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


// Set up Handlebars
app.engine('handlebars', engine({ 
    defaultLayout: 'main',
    extname: '.handlebars', 
    partialsDir: 'views/partials'
}));
app.set('view engine', 'handlebars');



app.use('/', homeRoutes);
app.use('/', authRoutes);
app.use('/', dashboardRoutes);
app.use('/', blogpostRoutes);

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
});
