//const express = require('express')
import express from 'express'
const path = require('path')
const { fileURLToPath } = require('url')
//const hostname = '89.104.66.35';

const PORT = 5020;

const app = express()

app.use(express.static(__dirname))


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})
app.listen(PORT)