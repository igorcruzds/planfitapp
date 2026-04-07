const express = require('express');
const router = express.Router();
const { getRanking } = require('../controllers/rankingController');

router.get('/ranking', getRanking);

module.exports = router;
