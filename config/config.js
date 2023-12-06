require('dotenv').config();
const Sequelize = require('sequelize');

let sequelize;

if (process.env.JAWSDB_URL) {
    // On Heroku, JawsDB
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    // Locally, use your local database configuration
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        dialect: 'mysql' // or 'postgres', 'sqlite', etc.
    });
}

module.exports = sequelize;
