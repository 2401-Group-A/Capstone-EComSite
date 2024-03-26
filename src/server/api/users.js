const express = require('express');
const usersRouter = express.Router();
const requireToken = require('./requireToken');
const { createUser, getUser, getUserByEmail, getUserById, getAllUsers, isAdminById } = require('../db');

const jwt = require('jsonwebtoken');

// -----GET All Users-----
usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await getAllUsers();

    res.send({
      users,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// -----GET Single User-----

usersRouter.get('/me', requireToken, async (req, res, next) => {
  console.log('user', req.user);
  const user = await getUserById(req.user.id);
  try {
    if (!user) {
      res.status(404).send('No user found');
    } else {
      res.send(user);
    }
  } catch (err) {
    next(err);
  }
});

usersRouter.get("/admin", requireToken, async (req, res, next) => {
  console.log("user", req.user);
  const admin = await isAdminById(req.user.id);
  console.log(admin);
  try {
    if (!admin) {
      res.send({admin: false});
    }else {
      res.send({admin: admin});
    }
    } catch (err) {
      next(err);
    }
});

// -----POST Login-----
usersRouter.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next({
      name: 'MissingCredentialsError',
      message: 'Please supply both an email and password',
    });
  }
  try {
    const user = await getUser({ email, password });
    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1w',
        }
      );

      res.send({
        message: 'Login successful!',
        token,
      });
    } else {
      next({
        name: 'IncorrectCredentialsError',
        message: 'Username or password is incorrect',
      });
    }
  } catch (err) {
    next(err);
  }
});

// -----POST Register User-----
usersRouter.post('/register', async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    password,
    address,
    city,
    state,
    zipcode,
  } = req.body;

  try {
    const _user = await getUserByEmail(email);

    if (_user) {
      next({
        name: 'UserExistsError',
        message: 'A user with that email already exists',
      });
    }

    const user = await createUser({
      firstname,
      lastname,
      email,
      password,
      address,
      city,
      state,
      zipcode,
    });

    const token = jwt.sign(
      {
        id: user.id,
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1w',
      }
    );

    res.send({
      message: 'Sign up successful!',
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});


// GET all users
usersRouter.get('/', async (req, res, next) => {
  try {
      const users = await getAllUsers();
      res.json({ users });
  } catch (error) {
      next(error);
  }
});

module.exports = usersRouter;
