const express = require('express');
const router = express.Router();
const { signUp, signIn, googleLogin } = require('../controller/authController');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/google', googleLogin);

module.exports = router;
