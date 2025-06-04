const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await req.User.find();
  res.json(users);
});

router.post('/', async (req, res) => {
  const user = await req.User.create(req.body);
  res.status(201).json(user);
});

module.exports = router;
