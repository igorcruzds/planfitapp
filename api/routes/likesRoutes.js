const express = require('express');
const router = express.Router();
const { likePost } = require('../controllers/likesController');

router.post('/like', likePost);

module.exports = router;
