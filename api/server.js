const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const authRouter = require('../auth/auth-router.js')
const howtoRouter = require('../howto/howto-router.js')

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/api/auth', authRouter)
server.use('/api/howto', howtoRouter)

server.get('/', (req, res) => {
  res.send('documentation can be found in the readme.md file')
})

module.exports = server
