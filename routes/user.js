const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');

// Get All Users
router.get('/users', (req, res) => {
  userService.query().then((users) => res.json(users));
});

// Get Single User
router.get('/users/:id', (req, res) => {
  userService.getById(req.params.id).then((user) => res.json(user));
});

// Delete User
router.delete('/users/:id', (req, res) => {
  userService.remove(req.params.id).then((user) => res.json(user));
});

// Signup new user
router.post('/signup', (req, res) => {
  userService.save(req.body).then((user) => {
    req.session.logginUser = user;
    req.session.loginAt = Date.now();
    res.json(user);
  });
});

// Login user
router.post('/login', (req, res) => {
  userService.checkLogin(req.body).then((user) => {
    if (user) {
      req.session.logginUser = user;
      req.session.loginAt = Date.now();
      res.json(user);
    } else res.status(401).send('Invalid Cardentials');
  });
});

// Logout user
router.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.end();
});

module.exports = router;
