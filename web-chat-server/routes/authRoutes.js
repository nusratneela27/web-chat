const express = require('express');
const { registerUser, loginUser, getUsers, logout } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post("/logout", logout);
router.get('/users', getUsers);

module.exports = router;
