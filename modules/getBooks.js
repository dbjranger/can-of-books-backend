
'use strict';

const jwt = require('jsonwebtoken');
const BookModel = require('../models/books.js');
const getKey = require('./getKey.js');

const getBooks = (request, response) => {
  const token = request.headers.authorization.split(' ')[1];

  try {
    jwt.verify(token, getKey, {}, function (error, user) {
      if (error) {
        response.status(500).send('Token is incorrect');
      }
      BookModel.find((error, booksdb) => {
        response.send(booksdb);
      });
    });
  }
  catch (error) {
    response.status(500).send('Error occurred!');
  }
};



module.exports = getBooks;