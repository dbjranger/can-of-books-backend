'use strict';

const mongoose = require('mongoose');
const BookModel = require('../models/books.js');

const clear = async (request, response) => {
  try {
    await BookModel.deleteMany({});
    response.send('Database bombed');
  } catch (error) {
    response.send('Error occurred while deleting the Database');
  }
}



module.exports = clear;