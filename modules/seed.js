'use strict';

const BookModel = require('../models/books.js');
const addNewBook = require('./addNewBook');

let seedData = [
  {
    'title': 'Endless Summer',
    'description': 'Classic southern California surfing book',
    'status': 'Active',
    'email': 'bandydon@gmail.com',
  },
  {
    'title': 'Old School',
    'description': 'Funny book about old people going back to college',
    'status': 'Active',
    'email': 'bandydon@gmail.com',
  },
  {
    'title': 'Air Jordan',
    'description': 'The life of Michael Jordan',
    'status': 'Active',
    'email': 'bandydon@gmail.com',
  }
];

let seed = async (request, response) => {

  let booksdb = await BookModel.find({});
  if (booksdb.length === 0) {
    seedData.map((book) => addNewBook(book));
    // response.send('Seeded three books to the DB');
  }
};

module.exports = seed;