// routes/index.js
const express = require('express');

const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');
// const AuthController = require('../controllers/AuthController');
// const FilesController = require('../controllers/FilesController');

const router = express.Router();

// Endpoint: GET /status
router.get('/status', AppController.getStatus);

// Endpoint: GET /stats
router.get('/stats', AppController.getStats);

// Endpoint: GET /connect
// router.get('/connect', AppController.getConnect);

// Endpoint: GET /disconnect
// router.get('/disconnect', AppController.getDisconnect);

// Endpoint: GET /users
router.get('/users', UsersController.postNew);

// Endpoint: GET /users/me
router.get('/users/me', UsersController.getMe);

// Endpoint: GET /files/:id
// router.get('/files/:id', FilesController.getShow);

// Endpoint: GET /files
// router.get('/files', FilesController.getIndex);

// Endpoint: GET /files/:id/data
// router.get('/files/:id/data', FilesController.getFile);


// Endpoint: POST /users
router.post('/users', UsersController.postNew);

// Endpoint: POST /files
// router.post('/files', FilesController.postUpload);


// Endpoint: PUT /files/:id/publish
// router.put('/files/:id/publish', FilesController.putPublish);

// Endpoint: PUT /files/:id/unpublish
// router.put('/files/:id/unpublish', FilesController.putUnpublish);

module.exports = router;
