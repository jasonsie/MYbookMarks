const express = require('express');
const { askAI } = require('../models/bookMarks.controller');

const bookMarksRouter = require('./bookMarks/bookMarks.router');

const api = express.Router();

api.use('/bookMarks', bookMarksRouter);
api.post('/askAI', askAI);

module.exports = api;
