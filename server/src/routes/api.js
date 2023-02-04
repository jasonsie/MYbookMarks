const express = require('express');

const bookMarksRouter = require('./bookMarks/bookMarks.router');

const api = express.Router();

api.use('/bookMarks', bookMarksRouter);

module.exports = api;
