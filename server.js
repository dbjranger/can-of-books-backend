'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const app = express();
app.use(cors());

/////////////////    JSONWEBTOKEN DOCUMENTATION    ///////////////////////

const { response } = require('express');
var client = jwksClient({
  jwksUri: 'https://dev-t18s8k45.us.auth0.com/.well-known/jwks.json'
});

function getKey(header, callback){
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

/////////////////    ROUTES    /////////////////////////


const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {
  // grab the token sent by the front end
  const token = request.headers.authorization.split(' ')[1];

  // the second part is from jet docs
  jwt.verify(token, getKey, {}, function (err, user){
    if(err){
      response.status(500).send('invalid token');
    }
    resquest.send(user);
  });
});



  // TODO: 
  // STEP 1: get the jwt from the headers
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end



app.listen(PORT, () => console.log(`listening on ${PORT}`));
