require('dotenv/config');
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { loginValidation } = require('../utils/userValidation');
const {
    addLogController,
    updateLogController } = require('../controllers/userLogController');

// Create login Controller
async function loginController(req, res) {
    // Retrieve data from the request
    const { username, password } = req.body;

    try {
        // Check if data is valid
        const { error } = loginValidation(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        // Check if the user exists
        const user = await userModel.findOne({
            username: username,
            deleted: false
        });
        if (!user) return res.status(401).json({ message: "Invalid username or password" });

        // Compare the provided password with the stored hashed password
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) return res.status(401).json({ message: "Invalid username or password" });

        // Log the user login
        const loginTime = new Date();
        const logId = await addLogController(user._id, loginTime, null);

        // Create a JWT token
        const jwtToken = jwt.sign({
            userName: user.username,
            userId: user._id,
            role: user.role,
            logId: logId
        }, process.env.JWT_SECRET, { expiresIn: '24h' });

        // Assign the token to a cookie named 'token'
        res.cookie('jwtToken', jwtToken, { httpOnly: true, sameSite: 'None', secure: true });

        // Send the response
        res.status(200).json({
            userName: user.username,
            userId: user._id,
            role: user.role
        });
    } catch (error) {
        console.error('Error login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


// Create logout Controller
async function logoutController(req, res) {
    const {logId}  = req.user;

    try {
        const { jwtToken } = req.cookies;

        // Check if the token is empty
        if (!jwtToken) {
            return res.status(401).json({ message: 'Access denied: No token provided' });
        }

        // Update log
        const logoutTime = new Date();
        await updateLogController(logId, logoutTime);

        res.clearCookie('jwtToken');
        res.status(205);
        res.json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error logout:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = { loginController, logoutController };