const router = require('express').Router();
const {
    loginController,
    logoutController } = require('../controllers/authController');
const verifyToken = require('../utils/jwtVerification');

// Create login endpoint
router.post('/login', loginController);

// Create logout endpoint
router.post('/logout', verifyToken, logoutController);


module.exports = router;