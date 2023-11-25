const router = require('express').Router();
const {
    loginController,
    logoutController } = require('../controllers/authController');

// Create login endpoint
router.post('/login', loginController);

// Create logout endpoint
router.post('/logout', logoutController);


module.exports = router;