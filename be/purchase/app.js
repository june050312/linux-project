const express = require('express');
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');
const loginVerify = require('../middleware/loginVerify')
const promClient = require('prom-client')

const { 
  purchaseGoods,
  cancelPurchase,
  getPurchaseList
} = require('./controller')

const port = process.env.PORT || 8080

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FE_URL,
  credentials: true,
}));

promClient.collectDefaultMetrics()

app.get('/api/purchase', loginVerify, getPurchaseList)
app.post('/api/purchase', loginVerify, purchaseGoods)
app.delete('/api/purchase', loginVerify, cancelPurchase)

app.get('/api/purchase/metrics', async (req, res) => {
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