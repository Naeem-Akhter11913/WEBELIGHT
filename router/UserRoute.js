const express = require('express');
const { UserRegister, LoginUser } = require('../controllers/UserControllers');
const router = express.Router();

router.post('/register',UserRegister)
router.post('/login',LoginUser)
module.exports = router;
