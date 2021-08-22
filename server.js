
'use strict';

// Express Server
require('dotenv').config();
const express = require('express');
const app = express();

// Read Data Across Files
const cors = require('cors');
app.use(cors());

//Mongoose DB
const mongoose = require('mongoose');

// Clear: delete, Seed: post, getBooks: brings back getBooks module.
const clear = require('./modules/clearDB.js');
const seed = require('./modules/seed.js');
const getBooks = require('./modules/getBooks');

const BookModel = require('./models/books.js')

//Setting Port
const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
  response.send('Server is up and running');
});

app.get('/books', getBooks) ;

app.get('/clear', clear);

app.get('/seed', seed);

app.get('/allbooks', (request, response) => {
  console.log("Getting all books")
  BookModel.find( {} , (error, books) => {
    if (error) {
      response.status(500).send('Error: Unable to read All books');
    } 
      response.status(200).send(books)
  })
})

mongoose.connect('mongodb://127.0.0.1:27017/books',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', _ => {
  console.log('We\'re Connected to the Database!');

});


// mongoose.connect('mongodb://127.0.0.1:27017/books', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => {
//     console.log('Connected to the database');
//   });

app.listen(PORT, () => console.log(`listening on ${PORT}`));
