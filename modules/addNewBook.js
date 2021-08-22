'use strict';

const mongoose = require('mongoose');

const BookModel = require('../models/books.js');

let addNewBook = async (book) => {
  let newBook = new BookModel(book);
  await newBook.save();
}

module.exports = addNewBook;