  'use strict';

const jwksClient = require('jwks-rsa');

const client = jwksClient({ 
  jwksUri: 'https://dev-7r9p60zq.us.auth0.com/.well-known/jwks.json'
});

const getKey = (header, callback) => {
  client.getSigningKey(header.kid, function (error, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
};

module.exports = getKey;