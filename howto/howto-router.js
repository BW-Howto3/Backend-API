const router = require('express').Router()
const userDB = require('../auth/users-model')
const howtoDB = require('../howto/howto-model')

//return howto, join username, and steps
  // example return
  // res.status(200).json({
  //   id: 1,
  //   user_id: 2,
  //   username: "brian",
  //   name: "How To Swap Your Automatic For a Manual",
  //   description: "1998-2003 TDI VW Beetle Automatic to Manual Swap guide",
  //   active: 1,
  //   steps: [
  //     {
  //       id: 1,
  //       howto_id: 1,
  //       name: "Take Air Box Out",
  //       description: "Remove hose clamp, and both bolts holding the air box out, unplug mass airflow sensor, and vacuum release hose.",
  //       active: 1,
  //       step_number: 1
  //     },
  //     {
  //       id: 2,
  //       howto_id: 1,
  //       name: "Remove battery and tray",
  //       description: "Remove cover from battery,\nRemove negative battery cable first, then the positive\nRemove headlight cover\nRemove battery hold down\nRemove battery\nRemove four screws holding battery tray to chassis\nRemove tray",
  //       active: 1,
  //       step_number: 2
  //     }
  //   ]
  // })

router.get('/', (req, res) => {
  howtoDB.allHowtos()
    .then(howtos => {
      res.status(200).json(howtos)
    })
    .catch( error => {
      res.status(500).json({message: "database connection error", error: error})
    })
})

router.get('/:id', howtoIdExists, attachUsername, attachSteps, (req, res) => {
  //console.log(req.data)
  res.status(200).json(req.data)
})

router.post('/', (req, res) => {
  res.status(200).json({message:req.body})
})

router.post('/:id/steps', (req, res) => {
  res.status(200).json({message:req.body, post_id:req.params.id})
})

router.put('/:id/steps', (req, res) => {
  res.status(200).json({message:req.body, post_id:req.params.id})
})

router.delete('/:id/steps', (req, res) => {
  res.status(200).json({deleted_step: req.params.id})
})

router.post('/:id', (req, res) => {
  res.status(200).json({message:req.body, post_id:req.params.id})
})

router.put('/:id', (req, res) => {
  res.status(200).json({message:req.body, post_id:req.params.id})
})

router.delete('/:id', howtoIdExists, DeleteIt, (req, res) => {
  howtoDB.deleteHowto(req.params.id, req.data.active)
    .then(result => {
      res.status(200).json({deleted_howto:req.data, result: result})
    })
})

//middleware

function attachSteps(req,res,next) {
  howtoDB.findStepBy(req.data.id)
  .then(steps => {
    console.log(steps)
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
  howtoDB.findHowtoBy(req.params.id)
    .then(howto => {
      howto[0] != undefined ? req.data = howto[0] 
      : res.status(401).json({message: "database returned empty set", data: howto})
      next()
    })
    .catch( error => {
      res.status(500).json({message: "database connection error", error: error})
    })
}

function intToBoolean(int) {
  return int === 1 ? true : false;
}

function booleanToint(bool) {
  return bool === true ? 1 : 0;
}

module.exports = router