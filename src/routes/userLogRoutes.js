/**
 * @swagger
 * tags:
 *   name: UserLog
 *   description: Endpoints for user log management
 */

const router = require('express').Router();
const verifyToken = require('../middlewares/jwtVerification');
const {
    addLogController,
    updateLogController
} = require('../controllers/userLogController');

// Endpoint to add a log
/**
 * @swagger
 * /api/logs:
 *   post:
 *     summary: Add a new user log
 *     tags: [UserLog]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - loginTime
 *               - logoutTime
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *               loginTime:
 *                 type: string
 *                 format: date-time
 *                 description: The login time
 *               logoutTime:
 *                 type: string
 *                 format: date-time
 *                 description: The logout time
 *     responses:
 *       200:
 *         description: User log added successfully
 *         content:
 *           application/json:
 *             example:
 *               logId: 12345
 *       403:
 *         description: Unauthorized (token missing or invalid)
 *       500:
 *         description: Internal server error
 */
router.post('/', verifyToken, addLogController);

// Endpoint to update a log
/**
 * @swagger
 * /api/logs/{id}:
 *   put:
 *     summary: Update user log
 *     tags: [UserLog]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user log
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - logoutTime
 *             properties:
 *               logoutTime:
 *                 type: string
 *                 format: date-time
 *                 description: The updated logout time
 *     responses:
 *       200:
 *         description: User log updated successfully
 *       403:
 *         description: Unauthorized (token missing or invalid)
 *       500:
 *         description: Internal server error
 */
router.put('/:id', verifyToken, updateLogController);

module.exports = router;