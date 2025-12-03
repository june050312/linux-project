const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const loginVerify = require('../middleware/loginVerify')
const promClient = require('prom-client')

const app = express()
const { 
  getUser, 
  createUser, 
  loginUser,
  deleteUser,
  logoutUser,
  updateUser
} = require('./controller')

const port = process.env.PORT || 8080

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.FE_URL,
  credentials: true,
}))

promClient.collectDefaultMetrics()

app.get('/api/user', loginVerify, getUser)
app.post('/api/user/login', loginUser)
app.post('/api/user/register', createUser)
app.post('/api/user/logout', loginVerify, logoutUser)
app.put('/api/user', loginVerify, updateUser)
app.delete('/api/user', loginVerify, deleteUser)

app.get('/api/user/metrics', async (req, res) => {
  try {
    res.set('Content-Type', promClient.register.contentType)
    res.end(await promClient.register.metrics())
  } catch (error) {
    res.status(500).send('Error fetching metrics')
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})