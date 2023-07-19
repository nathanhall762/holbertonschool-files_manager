// routes/index.js
const express = require('express');
const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');

const router = express.Router();

// Endpoint: GET /status
router.get('/status', AppController.getStatus);

// Endpoint: GET /stats
router.get('/stats', AppController.getStats);

// Endpoint: POST /users
router.post('/users', UsersController.postNew);

module.exports = router;
