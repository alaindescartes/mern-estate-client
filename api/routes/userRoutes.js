const express = require('express');
const router = express.Router();
const { updateUser } = require('../controller/userController');
const { verifyUser } = require('../utils/verifyUser');

router.get('/', (req, res) => {
  res.send('in user routes');
});
router.post('/update/:id', verifyUser, updateUser);

module.exports = router;
