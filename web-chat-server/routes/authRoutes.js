import express from 'express';
import { registerUser, loginUser, logout } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post("/logout", logout);

export default router;

// const express = require('express');
// const { registerUser, loginUser, logout } = require('../controllers/authController');

// const router = express.Router();

// router.post('/register', registerUser);
// router.post('/login', loginUser);
// router.post("/logout", logout);

// module.exports = router;
