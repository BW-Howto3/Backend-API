const db = require('../database/dbConfig')

module.exports = {
   addHowto,
   addStep,
   updateHowto,
   updateStep,
   deleteHowto,
   deleteStep,
   updateHowto,
   updateStep,
   findHowtoBy,
   findStepBy
}

//howtos

function addHowto(user) {
   return db('howtos')
    .insert(user)
}

function updateHowto(id, body){
  return db('howtos')
    .where({ id: id })
    .update(body)
}

function deleteHowto(id){
  return db('howtos')
    .where({id: id})
    .del()
}

function findHowtoBy(id) {
   return db('howtos').where({id: id})
}

//steps

function addStep(user) {
  return db('steps')
   .insert(user)
}

function updateStep(id, body){
 return db('steps')
   .where({ id: id })
   .update(body)
}

function deleteStep(id){
 return db('steps')
   .where({id: id})
   .del()
}

function findStepBy(id) {
  return db('steps').where({id: id})
}
