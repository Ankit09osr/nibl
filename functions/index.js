const functions = require("firebase-functions");
const admin = require('firebase-admin');
var app = require('./server/serverConfig');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
exports.app = functions.https.onRequest(app);
