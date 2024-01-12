/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: API endpoints for managing projects
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - projectName
 *         - description
 *         - discipline
 *         - type
 *         - authors
 *         - yearOfSubmission
 *       properties:
 *         projectName:
 *           type: string
 *           description: The name of the project
 *         description:
 *           type: string
 *           description: Description of the project
 *         discipline:
 *           type: string
 *           description: Discipline of the project
 *         type:
 *           type: string
 *           description: Type of the project
 *         cover:
 *           type: string
 *           description: URL/path to the cover image
 *         projectUrl:
 *           type: string
 *           description: URL of the project
 *         authors:
 *           type: array
 *           items:
 *             type: string
 *           description: List of authors for the project
 *         yearOfSubmission:
 *           type: integer
 *           description: Year of project submission
 *       example:
 *         projectName: My Project
 *         description: This is a sample project
 *         discipline: Computer Science
 *         type: Web application
 *         authors: ["Author1", "Author2"]
 *         yearOfSubmission: 2022
 */

const router = require('express').Router();
const verifyToken = require('../middlewares/jwtVerification');
const {
    addProjectController,
    getProjectsController,
    getProjectsByDisciplineController,
    getProjectsByTypeController,
    getProjectByIdController,
    getProjectsByDisciplineTypeController,
    updateProjectController,
    deleteProjectController,
    searchProjectsController
} = require('../controllers/projectController');
const multer = require('multer');
const path = require('path');
const checkAdminOrMember = require('../middlewares/checkAdminOrMember');
const apicache = require('apicache');

let cache = apicache.middleware;

// Setup the location to save the files
const storage = multer.diskStorage({
    // Define the destination directory based on file type
    destination: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg'
            || file.mimetype === 'image/png'
            || file.mimetype === 'image/jpg') {
            cb(null, path.join(__dirname, '../../uploads/image'));
        } else {
            cb(null, path.join(__dirname, '../../uploads/document'));
        }
    },
    // Define the file name based on the current timestamp and a random number
    filename: function (req, file, cb) {
        const parts = file.originalname.split('.');
        const etx = parts[parts.length - 1];
        const name = `${Date.now()}_${Math.floor(Math.random() * 1000)}.${etx}`;
        cb(null, name);
    }
});

// Filter files based on fieldname (image or document) and MIME type
const fileFilter = (req, file, cb) => {
    if (file.fieldname === "image") {
        (file.mimetype === 'image/jpeg'
            || file.mimetype === 'image/png'
            || file.mimetype === 'image/jpg')
            ? cb(null, true)
            : cb(null, false);
    } else if (file.fieldname === "document") {
        (file.mimetype === 'application/pdf')
            ? cb(null, true)
            : cb(null, false);
    }
}

// Multer middleware for handling file uploads
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
}).fields([
    { name: 'document', maxCount: 1 },
    { name: 'image', maxCount: 1 }
]);

/**
 * @swagger
 * api/projects:
 *   post:
 *     summary: Add a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Project created successfully
 *               project:
 *                 projectName: My Project
 *                 description: This is a sample project
 *                 discipline: Computer Science
 *                 type: Web application
 *                 authors: ["Author1", "Author2"]
 *                 yearOfSubmission: 2022
 *       400:
 *         description: Bad request. Validation error.
 *         content:
 *           application/json:
 *             example:
 *               message: Validation error details
 */

router.post(
    '/projects',
    verifyToken,
    checkAdminOrMember,
    upload,
    addProjectController
);

/**
 * @swagger
 * api/projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Returns a list of projects
 *         content:
 *           application/json:
 *             example:
 *               projects: [{project1}, {project2}]
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */

router.get(
    '/projects',
    cache('1 minutes'),
    getProjectsController
);

/**
 * @swagger
 * api/projects/discipline/{discipline}:
 *   get:
 *     summary: Get projects by discipline
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: discipline
 *         schema:
 *           type: string
 *         required: true
 *         description: Discipline of the projects to retrieve
 *     responses:
 *       200:
 *         description: Returns a list of projects by discipline
 *         content:
 *           application/json:
 *             example:
 *               projects: [{project1}, {project2}]
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */

router.get(
    '/projects/discipline/{discipline}',
    cache('1 minutes'),
    getProjectsByDisciplineController
);

/**
 * @swagger
 * api/projects/type/{type}:
 *   get:
 *     summary: Get projects by type
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: Type of the projects to retrieve
 *     responses:
 *       200:
 *         description: Returns a list of projects by type
 *         content:
 *           application/json:
 *             example:
 *               projects: [{project1}, {project2}]
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */

router.get(
    '/projects/type/{type}',
    cache('1 minutes'),
    getProjectsByTypeController
);

/**
 * @swagger
 * api/projects/discipline/{discipline}/type/{type}:
 *   get:
 *     summary: Get projects by discipline and type
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: discipline
 *         schema:
 *           type: string
 *         required: true
 *         description: Discipline of the projects to retrieve
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: Type of the projects to retrieve
 *     responses:
 *       200:
 *         description: Returns a list of projects by discipline and type
 *         content:
 *           application/json:
 *             example:
 *               projects: [{project1}, {project2}]
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */

router.get(
    '/projects/discipline/{discipline}/type/{type}',
    cache('1 minutes'),
    getProjectsByDisciplineTypeController
);

/**
 * @swagger
 * api/projects/search:
 *   get:
 *     summary: Search projects by name or authors
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query for project name or authors
 *     responses:
 *       200:
 *         description: Returns a list of projects matching the search query
 *         content:
 *           application/json:
 *             example:
 *               projects: [{project1}, {project2}]
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */

router.get(
    '/projects/search',
    cache('1 minute'),
    searchProjectsController
);

/**
 * @swagger
 * api/projects/id/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the project to retrieve
 *     responses:
 *       200:
 *         description: Returns a project by ID
 *         content:
 *           application/json:
 *             example:
 *               projectName: My Project
 *               description: This is a sample project
 *               discipline: Computer Science
 *               type: Web application
 *               authors: ["Author1", "Author2"]
 *               yearOfSubmission: 2022
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             example:
 *               message: Project not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */

router.get('/projects/id/{id}', getProjectByIdController);

/**
 * @swagger
 * api/projects/{id}:
 *   put:
 *     summary: Update a project by ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the project to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Project updated successfully
 *               project:
 *                 projectName: Updated Project
 *                 description: Updated project description
 *                 discipline: Computer Science
 *                 type: Web application
 *                 authors: ["UpdatedAuthor"]
 *                 yearOfSubmission: 2022
 *       400:
 *         description: Bad request. Validation error.
 *         content:
 *           application/json:
 *             example:
 *               message: Validation error details
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             example:
 *               message: Project not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */

router.put(
    '/projects/{id}',
    verifyToken,
    checkAdminOrMember,
    upload,
    updateProjectController
);

/**
 * @swagger
 * api/projects/delete/{id}:
 *   put:
 *     summary: Delete a project by ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the project to delete
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Project deleted successfully
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             example:
 *               message: Project not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */

router.put(
    '/projects/delete/{id}',
    verifyToken,
    checkAdminOrMember,
    deleteProjectController
);

module.exports = router;
