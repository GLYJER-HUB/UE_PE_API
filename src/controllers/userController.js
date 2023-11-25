const router = require('express').Router();
const userModel = require('../models/userModel');
const { addUserValidation, updateUserValidation } = require('../utils/validation');
const bcrypt = require('bcryptjs');
require('dotenv/config');


// Controller to add a new user
async function addUserController(req, res) {
    // Retrieve data from the request
    const { username, password, role } = req.body;
    const addedBy = req.user ? req.user.userId : null;

    // Check the user role
    if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'member')) {
        return res.status(403).json({ message: 'Access denied!' });
    }

    try {
        // Check if data is valid
        const { error } = addUserValidation(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        // Check if the username is already taken
        const existingUser = await userModel.findOne({ username: username });
        if (existingUser) return res.status(400).json({ message: 'Username already exists' });

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
}


// Controller to get a list of users
async function getUsersController(req, res) {
    try {
        // Check the user role
        if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'member')) {
            return res.status(403).json({ message: 'Access denied!' });
        }

        // Retrieve all users from the database
        const allUsers = await userModel
            .find({}, '-password')
            .populate([
                { path: 'added_by', select: 'username' },
                { path: 'modified_by', select: 'username' }
            ]);

        res.status(200).send({ users: allUsers });
    } catch (error) {
        console.error('Error getting all users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


// Controller to get a user by _id
async function getUserController(req, res) {
    // Retrieve the id from the request params
    const { id } = req.params;

    // Check the user role
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied!' });
    }

    try {
        const user = await userModel
            .findById(id)
            .populate([
                { path: 'added_by', select: 'username' },
                { path: 'modified_by', select: 'username' }
            ]);

        res.status(200).send(user);
    } catch (error) {
        console.error('Error getting the user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


// Controller to update a user
async function updateUserController(req, res) {
    // Retrieve data from the request
    const { username, password, role } = req.body;
    const addedBy = req.user.userId;
    const { id } = req.params;

    // Check if the authenticated user has the right to update users
    if (!req.user || req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    try {
        // Check if data is valid
        const { error } = updateUserValidation(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        // Check if the username is already taken
        if (username) {
            const existingUser = await userModel.findOne({ username: username });
            if (existingUser) return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password 
        let hashedPassword = null;
        if (password) {
            const salt = bcrypt.genSaltSync(10);
            hashedPassword = bcrypt.hashSync(password, salt)
        }

        // Find the user to update
        const userToUpdate = await userModel.findById(id);

        // Check if the user exists
        if (!userToUpdate) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the document to the database
        await userToUpdate.updateOne({
            username: username ? username : userToUpdate.username,
            password: password ? hashedPassword : userToUpdate.password,
            role: role ? role : userToUpdate.role,
            added_by: addedBy,
            modified_by: addedBy
        });

        res.status(201).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


// Controller to delete a user
async function deleteUserController(req, res) {
    // Retrieve the id from the request params
    const { id } = req.params;

    // Check the user role
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied!' });
    }

    try {
        await userModel.deleteOne({ _id: id });
        res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error getting the user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {
    addUserController,
    getUsersController,
    getUserController,
    updateUserController,
    deleteUserController
};