const router = require('express').Router();
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { loginValidation } = require('../utils/validation');
require('dotenv/config');

// Create login endpoint
router.post('/login', async (req, res) => {
    // retrieve data from the request
    const { userName, password } = req.body;

    try {
        // Check if data is valid
        const { error } = loginValidation(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        // Check if the user exists
        const user = await userModel.findOne({ username: userName });
        if (!user) return res.status(401).json({ message: "Invalid username or password" });

        // Compare the provided password with the stored hashed password
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) return res.status(401).json({ message: "Invalid username or password" });

        // Create a JWT token
        const jwtToken = jwt.sign({
            userName: user.username,
            userId: user._id,
            role: user.role
        }, process.env.JWT_SECRET);

        // Assign the token to a cookie named 'token'
        res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true });

        // Send the response
        res.status(200).json({
            userName: user.username,
            userId: user._id,
            role: user.role
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;