const express = require('express');
const { engine } = require('express-handlebars');
const homeRoutes = require('./routes/homeRoute');

const app = express();

// Set up Handlebars
app.engine('handlebars', engine({
    defaultLayout: 'main',
    extname: '.handlebars', 
    partialsDir: 'views/partials'
}));
app.set('view engine', 'handlebars');

app.use('/', homeRoutes);

// Add other middleware and routes as needed

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
