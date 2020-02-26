require('dotenv').config()

const options = {
  client: 'mysql2',
  connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
  }
}

const knex = require('knex')(options);


knex.raw("SELECT VERSION()")
    .then((version) => console.log((version[0][0])))
    .catch((err) => { console.log( err); throw err })
    .finally(() => {
      knex.destroy();
    });