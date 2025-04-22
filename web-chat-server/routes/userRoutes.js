import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { getUsersForSidebar } from '../controllers/userController.js';

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);

export default router;

// const express = require('express');
// const protectRoute = require('../middleware/protectRoute');
// const { getUsersForSidebar } = require('../controllers/userController');

// const router = express.Router();

// router.get("/", protectRoute, getUsersForSidebar)

// module.exports = router; 