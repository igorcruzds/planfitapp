const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/profileController');

router.get('/profile/:id', getProfile);

module.exports = router;
