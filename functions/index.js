'use strict'

const functions = require('firebase-functions');
const request = require('request');
const url = require('url');

exports.forecast = functions.https.onRequest((req, res) => {
  let query = url.parse(req.url).query;
  request.get(`http://api.openweathermap.org/data/2.5/forecast?${query}`).pipe(res);
});
