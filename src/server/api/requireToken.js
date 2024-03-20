const jwt = require('jsonwebtoken');
const { getUserById } = require('../db/users');

const requireToken = async (req, res, next) => {
  try {
    const payload = jwt.verify(req.headers.authorization, process.env.JWT);
    const user = await getUserById(payload.id);
    if (user) {
      req.user = user;
      next();
    }
    res.status(401).send('Invalid login session or session has expired.')
  } catch (err) {
    next(err);
  }
};

module.exports = requireToken;
