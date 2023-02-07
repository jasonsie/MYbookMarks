const { fetchBookMarks } = require('../models/bookMarks.model');
let { bookmark_bar } = fetchBookMarks;
const { Configuration, OpenAIApi } = require('openai');

function textToBinary(str = '') {
  let res = '';
  res = str
    .split('')
    .map((char) => {
      return char.charCodeAt(0).toString(2);
    })
    .join('');
  return res;
}

function getAllBookMarks(req, res) {
  bookmark_bar = bookmark_bar.map((each) => {
    let numId = textToBinary(each.ctg[0]);

    return { ...each, id: Number(each.id), ctgId: numId };
  });
  bookmark_bar.sort((x, y) => x.ctgId - y.ctgId);
  res.json(bookmark_bar);
}

function getBookMark(req, res) {
  const { id } = req.query;
  const bookMark = bookmark_bar.find((each) => each.id === id);
  const isNum = /[\d]/g.test(id);

  if (isNum && bookMark) {
    res.json(bookMark);
  } else {
    res.status(400).json({
      error: 'query or id is not valid ',
    });
  }
}

function getBookMarksCtg(req, res) {
  const { ctgStr } = req.params;
  const ctg = bookmark_bar.filter((each) => each.ctg === ctgStr);

  if (ctg[0]) {
    res.send(ctg);
  } else {
    res.status(400).json({
      error: 'caategory Id is not valid',
    });
  }
}

function createBookMark(req, res) {
  const newBookMark = { ...req.body, id: bookmark_bar?.length };
  bookmark_bar.unshift(newBookMark);
  res.json(newBookMark);
}

function editBookMark(req, res) {
  const { id } = req.params;
  const bookMark = bookmark_bar.find((each) => each.id === id);
  const reBookMark = { ...bookMark, ...req.body };
  bookmark_bar = bookmark_bar.map((each) => (each.id == id ? reBookMark : each));

  res.json({ editingBM: reBookMark });
}

function deleteBookMark(req, res) {
  const { body: bookMarksArr } = req;
  bookmark_bar = bookmark_bar.filter((row) => {
    return !bookMarksArr.some((each) => each.id == row.id);
  });
  res.json({ message: 'deleting successfully', data: bookmark_bar });
}

async function askAI(req, res) {
  console.log(`req in api`, req.body.question);

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: 'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `get title and summary of ${req.body?.question}`,
      temperature: 0.7,
      max_tokens: 120,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      });
    }
  }
}

module.exports = {
  getAllBookMarks: getAllBookMarks,
  getBookMark: getBookMark,
  getBookMarksCtg: getBookMarksCtg,
  createBookMark: createBookMark,
  editBookMark: editBookMark,
  deleteBookMark: deleteBookMark,
  askAI: askAI,
};
