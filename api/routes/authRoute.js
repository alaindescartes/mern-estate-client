const express = require("express");
const router = express.Router();
const signUp = require("../controller/authController");

router.post("/signup", signUp);

module.exports = router;
