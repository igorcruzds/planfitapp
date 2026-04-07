const express = require('express');
const router = express.Router();
const { activateVip } = require('../controllers/vipController');

router.post('/vip', activateVip);

module.exports = router;
