require('dotenv').config()
const express = require('express')
const app = express()
const authRouter = require('./routes/auth.routes')
const { errorMiddleware } = require('./middlewares/error.middleware')
const taskrouter=require('./routes/task.routes');
app.use(express.json())
app.use(authRouter)
app.use(taskrouter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use(errorMiddleware)

if (require.main === module) {
  app.listen(5000, () => {
    console.log('server running on port 5000')
  })
}
module.exports = app