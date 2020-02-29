const db = require('../database/dbConfig')

module.exports = {
  allHowtos,
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

function addHowto(body) {
  return db('howtos')
    .insert(body)
}

function updateHowto(id, body){
  return db('howtos')
    .where({ id: id })
    .update(body)
}

function deleteHowto(id, del){
  return db('howtos')
    .where({id: id})
    .update({active: del})
}

function allHowtos() {
  return db(`howtos`).where({active: 1})
}

function findHowtoBy(id) {
  console.log(id)
  return db('howtos').where({id: id, active: 1})
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
  return db('steps').where({howto_id: id})
}