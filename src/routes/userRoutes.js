const router = require('express').Router();
const userModel = require('../models/userModel');
const { addUserValidation } = require('../utils/validation');
const verifyToken = require('../utils/jwtVerification');
const bcrypt = require('bcryptjs');
require('dotenv/config');

// Create endpoint to add a new user
router.post('/', async (req, res) => {
    // Retrieve data from the request
    const { username, password, role } = req.body;
    const addedBy = req.user ? req.user.userId : null;

    try {
        // Check if data is valid
        const { error } = addUserValidation(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        // Check if the username is already taken
        const existingUser = await userModel.findOne({ username: username });
        if (existingUser) return res.status(400).json({ error: 'Username already exists' });

        // Hash the password 
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt)

        // Create a new user document
        const newUser = new userModel({
            username: username,
            password: hashedPassword,
            role: role,
            added_by: addedBy,
            modified_by: addedBy
        });

        // Save the document to the database
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;