const router = require('express').Router()
const userDB = require('../auth/users-model')
const howtoDB = require('../howto/howto-model')

const authenticate = require('../auth/authenticate')

//list of howtos, no details
router.get('/', (req, res) => {
  howtoDB.allHowtos()
    .then(howtos => {
      res.status(200).json(howtos)
    })
    .catch( error => {
      res.status(500).json({message: "database connection error", error: error})
    })
})

//list of howtos with details
router.get('/:id', howtoIdExists, attachUsername, attachSteps, (req, res) => {
  res.status(200).json(req.data)
})

//post a new howto, must be logged in
//checkHowtoBody checks if user_id as a number, name, description as string, and sets active: 1
router.post('/', authenticate, checkHowtoBody, (req, res) => {
  // res.status(200).json({...req.body})
   howtoDB.addHowto(req.data)
          .then(inserted => {
            id = inserted[0]
            res.status(200).json({data: {...req.data, id: id}})
          })
          .catch(error => {
            res.status(404).json({error: error, message: "database rejected update"})
          })
})

//post a new step, must be logged in
router.post('/:id/step', authenticate, howtoIdExists, checkHowtoBody, checkStepBody, (req, res) => {
  req.data = {...req.data, howto_id: req.params.id}
  console.log(req.data)
   howtoDB.addStep(req.data)
          .then(inserted => {
            id = inserted[0]
            res.status(200).json({data: {...req.data, id: id}})
          })
          .catch(error => {
            res.status(404).json({error: error, message: "database rejected update"})
          })
})

//update a howto, must be logged in
//checkHowtoBody checks if user_id as a number, name, description as string, and sets active: 1
router.put('/:id', authenticate, howtoIdExists, checkHowtoBody, authorizeUserHowto, (req, res) => {
   //res.status(200).json({message:req.body, modified:req.data, post_id:req.params.id})
   howtoDB.updateHowto(req.params.id, req.data)
          .then(updated => {
            console.log(updated)
            id = updated[0]
            res.status(200).json({data: {...req.data, id: id}})
          })
          .catch(error => {
            res.status(404).json({error: error, message: "database rejected update"})
          })
})

//delete a howto, must be logged in
router.delete('/:id', authenticate, howtoIdExists, (req, res) => {
  howtoDB.deleteHowto(req.params.id, {active: 0})
    .then(result => {
      res.status(200).json({deleted_howto:req.data, result: result})
    })
})

//edit a step, must be logged in, verify step exists, 
router.put('/step/:id', authenticate, (req, res) => {
  res.status(200).json({message:req.body, post_id:req.params.id})
})

//delete a step, must be logged in
router.delete('/step/:id', authenticate, (req, res) => {
  res.status(200).json({deleted_step: req.params.id})
})

//middleware

function authorizeUserHowto(req,res,next){
  //console.log(req.user_info)
  //check to see if req.data.user_id is the same as on the howtos table at req.params.id
  if(req.body.user_id == req.user_info.subject){
    next()
  }
  else {
    res.status(403).json({error: error, message: "AuthZ rejected request at authorizeUser middleware. Rejected because user_id mismatch, user is not authorized to make a change to this record"})
  }
          
}

function checkStepBody(req,res,next) {
  console.log("check step body")
  if(typeof(req.body.step_number) === "number"){
    console.log("step body is a number")
    next()
  }else{
    res.status(401).json({error: "description must be a number"})
  }
}

function checkHowtoBody(req,res,next) {
  //console.log(req.data)
  //console.log(typeof(req.body.user_id))
  console.log("check Howto body")
  //check to see if user_id is a number  
  if(typeof(req.body.user_id) === "number"){
    console.log("user_id is a number")
    if(typeof(req.body.name) === "string"){
      console.log("name is a string")
      if(typeof(req.body.description) === "string"){
        console.log("description is a string")
        req.data = req.body
        req.data = {...req.data, active: 1}
        next()
      }else{
        res.status(401).json({error: "description must be a string"})  
      }
    }else{
      res.status(401).json({error: "name must be a string"})  
    }
  }else{
    console.log("user_id is not a number")
    res.status(401).json({error: "user_id must be a number"})
  }
}

function attachSteps(req,res,next) {
   howtoDB.findStepBy(req.data.id)
          .then(steps => {
            //console.log(steps)
            req.data = {...req.data, steps: steps}
          })
          .catch(error => {
            res.status(500).json({message: "database connection error", error: error})
          })
          .finally(()=> {
            next()
          })
}

function attachUsername(req,res,next) {
  userDB.findUserById(req.data.user_id)
    .then(name => {
      //console.log("username", name[0].username)
      req.data = {...req.data, username: name[0].username}
    })
    .catch(error => {
      res.status(500).json({message: "database connection error", error: error})
    })
    .finally(()=> {
      next()
    })

}

function DeleteIt(req,res,next) {
  //console.log(req.data)
  req.data.active == 1 ? req.data.active = 0 : req.data.active = 1
  next()
}

function howtoIdExists(req, res, next) {
  console.log("howto id exists")
  howtoDB.findHowtoBy(req.params.id)
    .then(howto => {
      howto[0] === undefined ? req.data = howto[0] 
      : res.status(401).json({message: "database returned empty set", data: howto})
      next()
    })
    .catch( error => {
      res.status(500).json({message: "database connection error howtoidexists", error: error})
    })
}

module.exports = router