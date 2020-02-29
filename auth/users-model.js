const db = require('../database/dbConfig')

module.exports = {
   addUser,
   findUserById,
   findUserByUserName
}

async function addUser(user) {
   return db('users')
      .insert(user)
}
function findUserByUserName(username) {
   return db('users').where({username: username})
}

function findUserById(id) {
   console.log("user_id", id)
   return db('users').where({ id: id }).select("username")
}