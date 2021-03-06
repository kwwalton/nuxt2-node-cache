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

// Return a string
app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

// Return a response object
app.get('/not-cached', async (req, res) => {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/todos/1'
    )
    res.send(response.data)
  } catch (e) {
    console.error(e)
  }
})

// Return a cached response object
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
