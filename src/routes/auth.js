const express = require('express');
const router = express.Router();
const { signup, login, googleSignin } = require("../controllers/authController");
const { validateSignup, validateLogin } = require('../middlewares/validate');

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.post('/google', googleSignin); 

module.exports = router;
