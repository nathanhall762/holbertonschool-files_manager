// routes/index.js
const express = require('express');
const AppController = require('../controllers/AppController');

const router = express.Router();

// Endpoint: GET /status
router.get('/status', AppController.getStatus);

// Endpoint: GET /stats
router.get('/stats', AppController.getStats);

module.exports = router;
