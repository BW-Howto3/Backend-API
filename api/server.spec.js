const request = require('supertest')
const server = require('./server.js')

//errors out without these
const authenticate = require('../auth/authenticate.js')
const Users = require('../auth/users-model')
const db = require('../database/dbConfig')

describe('server.js', () => {
   describe('/api/howto', () => {
      it('Returns 200 at howto get', async () => {
         const response = await request(server).get('/api/howto')
         expect(response.status).toBe(200)
      })
   })
   describe('/api/howto', () => {
      it('Returns json format', () => {
            request(server).get('/api/howto').then(res => {
            expect(res.type).toMatch(/json/gi)
            })
      })
   })
   describe('/api/howto/1', () => {
      it('Returns json format', () => {
            request(server).get('/api/howto/1').then(res => {
            expect(res.type).toMatch(/json/gi)
            })
      })
   })

   describe('/api/auth/login', () => {
      it('Returns json format', function (done) {
         request(server)
            .post('/api/auth/login')
            .send({ username: 'yosef', password: 'kohlscoh' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/gi)
            .end(function (err, res) {
               if (err) return done(err)
               done()
            })
      })

      it('Returns 200 and credentials', () => {
         request(server)
            .post(`/api/auth/login`)
            .send({ username: 'yosef', password: 'kohlscoh' })
            .then(res => {
               expect(res.status).toBe(200)
               expect(res.body.message).toBe("Welcome yosef")
            })
      })
   })

   describe('/api/auth/register', function () {
      it('responds 201 and json format', function () {
         request(server)
            .post('/api/auth/register')
            .send({ username: 'ford', password: 'prefect' })
            .then(res => {
               expect(res.status).toBe(201)
               expect(res.type, /json/gi)
            })
      })
   })
})