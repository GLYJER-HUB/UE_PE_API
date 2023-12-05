const router = require('express').Router();
const verifyToken = require('../utils/jwtVerification');
const {
    addUserController,
    getUsersController,
    getUserController,
    updateUserController,
    deleteUserController,
    searchUsersController
} = require('../controllers/userController');
const apicache = require('apicache');

let cache = apicache.middleware;


// Endpoint to add a new user
router.post('/', verifyToken, addUserController);


// Endpoint to get a list of users
router.get(
    '/',
    verifyToken,
    cache('1 minutes'),
    getUsersController
);


// Endpoint to search users by username and role
router.get(
    '/',
    verifyToken,
    cache('1 minutes'),
    searchUsersController
);


// Endpoint to get a user by _id
router.get('/:id', verifyToken, getUserController);


// Endpoint to update a user
router.put('/:id', verifyToken, updateUserController);


// Endpoint to delete a user
router.put('/delete/:id', verifyToken, deleteUserController);


module.exports = router;