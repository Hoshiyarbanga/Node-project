const express = require('express');
const login = require('../controllers/LoginController'); // Ensure the authController is properly defined

const router = express.Router();

// POST request for login
router.post('/', login.login); // Ensure login is imported and correctly referenced

module.exports = router;
