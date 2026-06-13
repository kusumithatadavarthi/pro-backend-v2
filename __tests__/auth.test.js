const request = require('supertest')
const app = require('../src/index')

describe('Auth Endpoints', () => {

  
  test('should register a new user', async () => {
    const response = await request(app)
      .post('/signup')
      .send({ 
        name: 'TestUser', 
        email: 'testuser11@gmail.com', 
        password: '123456' 
      })
    
    expect(response.status).toBe(201)
    expect(response.body.message).toBe('user registered successfully')
  })

  
  test('should login successfully', async () => {
    const response = await request(app)
      .post('/login')
      .send({ 
        email: 'testuser@gmail.com', 
        password: '123456' 
      })
    
    expect(response.status).toBe(200)
    expect(response.body.token).toBeDefined()
  })


  test('should return 400 for empty body', async () => {
    const response = await request(app)
      .post('/signup')
      .send({})
    
    expect(response.status).toBe(400)
  })

})