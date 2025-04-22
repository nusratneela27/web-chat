import express from 'express';
import { sendMessage, getMessages } from '../controllers/messageController.js';
import protectRoute from '../middleware/protectRoute.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, upload.single('image'), sendMessage);

export default router;

// const express = require('express');
// const { sendMessage, getMessages } = require('../controllers/messageController');
// const protectRoute = require('../middleware/protectRoute');
// const upload = require('../middleware/multer');

// const router = express.Router();

// router.get("/:id", protectRoute, getMessages);
// router.post("/send/:id", protectRoute, upload.single('image') ,sendMessage);

// module.exports = router;