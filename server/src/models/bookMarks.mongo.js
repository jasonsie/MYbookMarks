const mongoose = require('mongoose');

const bookMark = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  ctg: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
});

const bookMarksSchema = new mongoose.Schema({
  bookmark_bar: [bookMark],
});

//mongoose.model(<collection's name>, <schema's name>)
module.exports = mongoose.model('BookMark', bookMarksSchema);
