// routes/index.js
const express = require('express');
const router = express.Router();
const AppController = require('../controllers/AppController');

// Endpoint: GET /status
router.get('/status', AppController.getStatus);

// Endpoint: GET /stats
router.get('/stats', AppController.getStats);

module.exports = router;
