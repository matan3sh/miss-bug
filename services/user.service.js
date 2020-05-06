const fs = require('fs');
const users = require('../data/users.json');

function query() {
  return Promise.resolve(users);
}

function getById(userId) {
  const user = users.find((user) => user._id === userId);
  return Promise.resolve(user);
}

function checkLogin({ username, password }) {
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  return Promise.resolve(user);
}

function save(user) {
  if (user._id) {
    const idx = users.findIndex((currUser) => currUser._id === user._id);
    user.updatedAt = Date.now();
    users[idx] = user;
  } else {
    user._id = _makeId();
    user.createdAt = Date.now();
    users.unshift(user);
  }
  return _saveToFile().then(() => user);
}

function remove(userId) {
  const idx = users.findIndex((user) => user._id === userId);
  users.splice(idx, 1);
  return _saveToFile().then(() => users);
}

module.exports = {
  save,
  query,
  checkLogin,
  getById,
  remove,
};

function _saveToFile() {
  return new Promise((resolve, reject) => {
    const str = JSON.stringify(users, null, 2);
    fs.writeFile('data/users.json', str, function (err) {
      if (err) {
        console.log('Had Problems', err);
        return reject(new Error('Cannot update User file'));
      }
      resolve();
    });
  });
}

function _makeId(length = 6) {
  var txt = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}
