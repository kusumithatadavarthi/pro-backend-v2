require('dotenv').config()
const express = require('express')
const app = express()
const authRouter = require('./routes/auth.routes')
const { errorMiddleware } = require('./middlewares/error.middleware')

app.use(express.json())
app.use(authRouter)

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use(errorMiddleware)

app.listen(5000, () => {
  console.log('server running on port 5000')
})