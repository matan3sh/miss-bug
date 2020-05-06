const express = require('express');
const router = express.Router();
const bugService = require('../services/bug.service');

// Get All Bugs
router.get('/', (req, res) => {
  const criteria = {
    limit: +req.query.limit,
    offset: +req.query.offset,
    q: req.query.q,
  };
  bugService.query(criteria).then((bugs) => res.json(bugs));
});

// Get Single Bug
router.get('/:id', (req, res) => {
  bugService.getById(req.params.id).then((bug) => res.json(bug));
});

// Delete Bug
router.delete('/:id', (req, res) => {
  bugService.remove(req.params.id).then((bugs) => res.json(bugs));
});

// Create Bug
router.post('/', (req, res) => {
  bugService.save(req.body).then((bugSaved) => res.json(bugSaved));
});

// Update Bug
router.put('/:id', (req, res) => {
  bugService.save(req.body).then((savedBug) => res.json(savedBug));
});

module.exports = router;
