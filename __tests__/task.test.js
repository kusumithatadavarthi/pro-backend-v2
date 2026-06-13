const app=require('../src/index');
const request=require('supertest');
describe('task test verifications',()=>{
    let token
    beforeAll(async()=>{
        const response= await request(app).post('/login').send({
            email: 'shiva@gmail.com', password: '123456'
        })
        token=response.body.token
    })
      test('should create a task', async () => {
    const response = await request(app)
      .post('/addtask')
      .set('Authorization', `Bearer ${token}`)  // ← attach token here
      .send({ title: 'Test Task', description: 'Test Description' })
    
    expect(response.status).toBe(200)
  })
  test('should get all tasks of users',async()=>{
    const response= await request(app).get('/get_tasks').set('Authorization',`Bearer ${token}`)
    expect(response.status).toBe(200);
   expect(response.body.tasks).toBeDefined() // ✅ tasks array exists
expect(response.body.total).toBeDefined() // ✅ total exists
  })
})