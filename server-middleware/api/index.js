/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */

import axios from 'axios'
const express = require('express')
const cacheProvider = require('../cache-provider')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

cacheProvider.start(function (err) {
  if (err) {
    console.log('Error starting cache provider:', err)
    return
  }

  console.log('Cache provider started')
})

const CACHE_DURATION = 600
const CACHE_KEY = 'CACHE_KEY'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get('/', (req, res) => {
  res.send('api root level')
})

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

app.get('/morning', (req, res) => {
  res.send('Good morning!')
})

app.get('/todos', async (req, res) => {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/todos/1'
    )
    res.send(response.data)
  } catch (e) {
    console.error(e)
  }
})

app.get('/cached', async (req, res) => {
  const value = cacheProvider.instance().get(CACHE_KEY)
  if (!value) {
    try {
      console.log('not cached, fetching from server')
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos/2'
      )
      cacheProvider.instance().set(CACHE_KEY, response.data, CACHE_DURATION)
    } catch (e) {
      console.error(e)
    }
  }
  res.send(cacheProvider.instance().get(CACHE_KEY))
})

module.exports = app
