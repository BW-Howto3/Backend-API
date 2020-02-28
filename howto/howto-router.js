const router = require('express').Router()

router.get('/', (req, res) => {
  res.status(200).json({
    id: 1,
    user_id: 2,
    username: "brian",
    name: "How To Swap Your Automatic For a Manual",
    description: "1998-2003 TDI VW Beetle Automatic to Manual Swap guide",
    active: 1,
    steps: [
      {
        id: 1,
        howto_id: 1,
        name: "Take Air Box Out",
        description: "Remove hose clamp, and both bolts holding the air box out, unplug mass airflow sensor, and vacuum release hose.",
        active: 1,
        step_number: 1
      },
      {
        id: 2,
        howto_id: 1,
        name: "Remove battery and tray",
        description: "Remove cover from battery,\nRemove negative battery cable first, then the positive\nRemove headlight cover\nRemove battery hold down\nRemove battery\nRemove four screws holding battery tray to chassis\nRemove tray",
        active: 1,
        step_number: 2
      }
    ]
  })
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

router.post('/:id', (req, res) => {
  res.status(200).json({message:req.body, post_id:req.params.id})
})

router.put('/:id', (req, res) => {
  res.status(200).json({message:req.body, post_id:req.params.id})
})

router.post('')

module.exports = router