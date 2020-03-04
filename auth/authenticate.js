const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  const secret = "Mai-ia-hii Mai-ia-huu Mai-ia-haa Mai-ia-ha ha"
  if (token) {
    jwt.verify(token, secret, (err, token) => {
      if (err) {
        res.status(401).json({ you: 'shall not pass!' })
      } else {
        req.token = token
        next()
      }
    })
  } else {
    res.status(401).json({ message: 'Please try loggin in again!' })
  }
}