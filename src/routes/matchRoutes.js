const express = require('express');
const router = express.Router();
const { getMatches } = require('../controllers/matchController');

// use controller function
router.get('/matches/:id', getMatches);

module.exports = router;
