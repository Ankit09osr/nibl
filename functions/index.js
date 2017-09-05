const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require("express");
const app = express();
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');


app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/test', (req, res) => {
  console.log('req.query', req.query);
  res.send({data: 'get request to /api/test '});
})

app.post('/test', (req, res) => {
  res.send(req.body);
})

app.get('/querydishes', (req, res) => {
  res.send('Hello, Functions\n');
})





// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(app);