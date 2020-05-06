const fs = require('fs');
const bugs = require('../data/bugs.json');

function query(criteria) {
  var bugsToReturn = bugs;
  if (criteria.q) {
    bugsToReturn = bugsToReturn.filter((bug) => bug.title.includes(criteria.q));
  }
  if (criteria.offset) {
    bugsToReturn = bugsToReturn.slice(criteria.offset);
  }
  if (criteria.limit) {
    bugsToReturn = bugsToReturn.slice(0, criteria.limit);
  }
  return Promise.resolve(bugsToReturn);
}

function getById(bugId) {
  const bug = bugs.find((bug) => bug._id === bugId);
  return Promise.resolve(bug);
}

function remove(bugId) {
  const idx = bugs.findIndex((bug) => bug._id === bugId);
  bugs.splice(idx, 1);
  return _saveToFile().then(() => bugs);
}

function save(bug) {
  if (bug._id) {
    const idx = bugs.findIndex((curBug) => curBug._id === bug._id);
    bugs[idx] = bug;
  } else {
    bug._id = _makeId();
    bug.createdAt = Date.now();
    bugs.unshift(bug);
  }
  return _saveToFile().then(() => bug);
}

module.exports = {
  query,
  getById,
  remove,
  save,
};

function _saveToFile() {
  return new Promise((resolve, reject) => {
    const str = JSON.stringify(bugs, null, 2);
    fs.writeFile('data/bugs.json', str, function (err) {
      if (err) {
        console.log('Server Error:', err);
        return reject(new Error('Cannot update bugs file'));
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
