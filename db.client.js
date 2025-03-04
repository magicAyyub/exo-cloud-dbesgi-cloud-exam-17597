const { Sequelize } = require('sequelize')

const host = process.env.DB_HOST
const port = process.env.DB_PORT 
const database = process.env.DB_NAME 
const username = process.env.DB_USERNAME 
const password = process.env.DB_PASSWORD 

// database
const sequelize = new Sequelize(
  database,
  username,
  password,
  {
    host: host,
    port: port,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
);

// authentication and synchronization
sequelize.authenticate()
  .then(() => {
    sequelize.sync().catch(() => console.log("Cannot sync the database"));
  })
  .catch(() => console.log("Cannot connect to database, please check environment credentials"));

module.exports = sequelize;