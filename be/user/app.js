const express = require('express');
const cors = require('cors');
const app = express()
const { 
  getUser, 
  createUser, 
  loginUser,
  deleteUser
} = require('./controller')

const port = process.env.PORT || 8080

app.use(express.json())
app.use(cors())

app.get('/api/user', getUser)
app.post('/api/user/register', createUser)
app.post('/api/user/login', loginUser)
app.delete('/api/user/delete', deleteUser)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})