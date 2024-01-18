const router = require('express').Router();
const verifyToken = require('../middlewares/jwtVerification');
const {
    addUserController,
    getUsersController,
    getUserController,
    updateUserController,
    deleteUserController,
    searchUsersController,
} = require('../controllers/userController');
const checkAdminOrSuperadmin = require('../middlewares/checkAdminOrSuperadmin');
const checkUserRole = require('../middlewares/checkUserRole');
const apicache = require('apicache');

let cache = apicache.middleware;
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Add a new user.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddUser'
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Bad request or validation error.
 *       403:
 *         description: Access denied (insufficient permissions).
 *       500:
 *         description: Internal server error.
 */
router.post('/', verifyToken, checkAdminOrSuperadmin, addUserController);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get a list of users.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserSearchQuery'
 *     responses:
 *       200:
 *         description: List of users.
 *       403:
 *         description: Access denied (insufficient permissions).
 *       500:
 *         description: Internal server error.
 */
router.get(
    '/',
    verifyToken,
    checkUserRole,
    cache('1 minutes'),
    getUsersController
);

/**
 * @swagger
 * /api/users/search:
 *   get:
 *     summary: Search users by username and role.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserSearchQuery'
 *     responses:
 *       200:
 *         description: List of users matching the search query.
 *       403:
 *         description: Access denied (insufficient permissions).
 *       500:
 *         description: Internal server error.
 */
router.get(
    '/search',
    verifyToken,
    checkUserRole,
    cache('1 minutes'),
    searchUsersController
);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       200:
 *         description: User details.
 *       403:
 *         description: Access denied (insufficient permissions).
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
    '/:id',
    verifyToken,
    checkAdminOrSuperadmin,
    getUserController
);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user by ID.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       400:
 *         description: Bad request or validation error.
 *       403:
 *         description: Access denied (insufficient permissions).
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
    '/:id',
    verifyToken,
    checkAdminOrSuperadmin,
    updateUserController
);

/**
 * @swagger
 * /api/users/delete/{id}:
 *   put:
 *     summary: Delete user by ID.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       403:
 *         description: Access denied (insufficient permissions).
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
    '/delete/:id',
    verifyToken,
    checkAdminOrSuperadmin,
    deleteUserController
);


module.exports = router;
