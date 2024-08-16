const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', userController.getUsers);
router.post('/', userController.createUser);

// Protected routes (require authentication)
router.get('/:id', authMiddleware, userController.getUserById);

module.exports = router;
