const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { getMe, updateProfile } = require('../controllers/userController');

router.get('/me', auth, getMe);
router.put('/me', auth, updateProfile);

module.exports = router;
