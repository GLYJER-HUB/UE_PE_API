const router = require('express').Router();
const verifyToken = require('../utils/jwtVerification');
const {
    addProjectController,
} = require('../controllers/projectController');

// Endpoint to add a new project
router.post('/', verifyToken, addProjectController);

// // Endpoint to get a list of projects
// router.get('/',  getProjectsController);

// // Endpoint to get a project by _id
// router.get('/:id',  getProjectController);

// // Endpoint to update a project
// router.put('/:id', verifyToken, updateProjectController);

// // Endpoint to delete a project
// router.delete('/:id', verifyToken, deleteProjectController);

module.exports = router;