const router = require('express').Router();
const verifyToken = require('../middlewares/jwtVerification');
const {
    addUserController,
    getUsersController,
    getUserController,
    updateUserController,
    deleteUserController,
    searchUsersController
} = require('../controllers/userController');
const checkAdminOrSuperadmin = require('../middlewares/checkAdminOrSuperadmin');
const checkUserRole = require('../middlewares/checkUserRole');


// Endpoint to add a new user
router.post('/', verifyToken, checkAdminOrSuperadmin, addUserController);


// Endpoint to get a list of users
router.get(
    '/',
    verifyToken,
    checkUserRole,
    getUsersController
);


// Endpoint to search users by username and role
router.get(
    '/search',
    verifyToken,
    checkUserRole,
    searchUsersController
);


// Endpoint to get a user by _id
router.get(
    '/:id',
    verifyToken,
    checkAdminOrSuperadmin,
    getUserController);


// Endpoint to update a user
router.put(
    '/:id',
    verifyToken,
    checkAdminOrSuperadmin,
    updateUserController);


// Endpoint to delete a user
router.put(
    '/delete/:id',
    verifyToken,
    checkAdminOrSuperadmin,
    deleteUserController);


module.exports = router;
