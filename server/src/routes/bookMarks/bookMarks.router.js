const express = require('express');
const {
  getAllBookMarks,
  getBookMark,
  getBookMarksCtg,
  createBookMark,
  editBookMark,
  deleteBookMark,
} = require('../../models/bookMarks.controller');

const bookMarksRouter = express.Router();

bookMarksRouter.get('/', getAllBookMarks);
bookMarksRouter.get('/bm', getBookMark);
bookMarksRouter.get('/:ctgStr', getBookMarksCtg);
bookMarksRouter.put('/', createBookMark);
bookMarksRouter.post('/:id', editBookMark);
bookMarksRouter.delete('/', deleteBookMark);

module.exports = bookMarksRouter;
