const express = require('express');
const router = express.Router();
const { registerWorkout, swapWorkout } = require('../controllers/workoutController');

router.post('/register-workout', registerWorkout);
router.post('/swap-workout', swapWorkout);

module.exports = router;
