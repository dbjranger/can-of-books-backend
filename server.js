
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

//Setting Port
const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
  res.send('Server is up and running');
});

app.get('/books', getBooks) ;

app.get('/clear', clear);

app.get('/seed', seed);

mongoose.connect('mongodb://127.0.0.1:27017/books', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to the database');
  });

app.listen(PORT, () => console.log(`listening on ${PORT}`));
