const express = require('express')
const app = express()

app.use(express.json())

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.listen(5000, () => {
  console.log('server running on port 5000')
})