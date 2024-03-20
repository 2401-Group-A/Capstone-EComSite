const jwt = require('jsonwebtoken');
const { getUserById } = require('..users.js');

const requireToken = async (req, res, next) => {
  try {
    const payload = jwt.verify(req.headers.authorization, process.env.JWT);
    const user = await getUserById(payload.id);
    if (user) {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = requireToken;
