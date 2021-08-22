'use strict';

const jwt = require('jsonwebtoken');
const BookModel = require('../models/books.js');
const jwksClient = require('jwks-rsa');

const client = jwksClient({ 
  jwksUri: 'https://dev-yaskul-6.us.auth0.com/.well-known/jwks.json'
});



function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

// function getKey(header, callback) {
//   client.getSigningKey(header.kid, function (error, key) {
//     const signingKey = key.publicKey || key.rsaPublicKey;
//     callback(null, signingKey);
//   });
// };

const getBooks = async (request, response) => {
  const token = await request.headers.authorization.split(' ')[1];

  console.log("this is:", token);

  try {
    jwt.verify(token, getKey, {}, function (error, user) {

      if (error) {
        response.status(500).send('Token is incorrect');
      }
      BookModel.find((error, booksData) => {
      
        console.log(booksData);

        response.send(booksData);
      });
    });
  }
  catch (error) {
    response.status(500).send('Error occurred!');
  };

}

module.exports = getBooks;