const jwt = require('jsonwebtoken');
const { getUserById } = require('../db/users');

const requireToken = async (req, res, next) => {
  try {
    const payload = jwt.verify(
      req.headers.authorization.split(' ')[1],
      process.env.JWT_SECRET
    );
    console.log('PAYLOAD', payload);
    const user = await getUserById(payload.id);
    console.log('reqtoken user', user);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).send('Invalid login session or session has expired.');
    }
  } catch (err) {
    next(err);
  }
};

module.exports = requireToken;
