const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization
  const secret = "Mai-ia-hii Mai-ia-huu Mai-ia-haa Mai-ia-ha ha"
  
  if (authorization) {
    jwt.verify(authorization, secret, (err, token) => {
      if (err) {
        res.status(401).json({ you: 'shall not pass!' })
      } else {
        req.user_info = token
        console.log("authenticate")
        next()
      }
    })
  } else {
    res.status(401).json({ message: 'Please try loggin in again!' })
  }
}