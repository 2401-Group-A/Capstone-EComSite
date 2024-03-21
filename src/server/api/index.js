const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');

const volleyball = require('volleyball');
apiRouter.use(volleyball);

// TO BE COMPLETED - set `req.user` if possible, using token sent in the request header
// apiRouter.use(async (req, res, next) => {
//   const auth = req.header('Authorization');

//   if (!auth) {
//     next();
//   } else if (auth.startsWith('REPLACE_ME')) {
//     // TODO - Get JUST the token out of 'auth'
//     const token = 'REPLACE_ME';

//     try {
//       const parsedToken = 'REPLACE_ME';
//       // TODO - Call 'jwt.verify()' to see if the token is valid. If it is, use it to get the user's 'id'. Look up the user with their 'id' and set 'req.user'
//     } catch (error) {
//       next(error);
//     }
//   } else {
//     next({
//       name: 'AuthorizationHeaderError',
//       message: `Authorization token must start with 'Bearer'`,
//     });
//   }
// });

// Users
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

// Products
const productRouter = require('./products');
apiRouter.use('/products', productRouter);

apiRouter.use((err, req, res, next) => {
  console.error(err); // please do log errors!
  res.status(500).send(err);
});

module.exports = apiRouter;
