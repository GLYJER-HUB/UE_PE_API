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
const multer = require('multer')
const path = require('path');
const checkAdminOrMember = require('../middlewares/checkAdminOrMember');

// Setup the location to save the files
const storage = multer.diskStorage({
    // Define the destination directory based on file type
    destination: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg'
            || file.mimetype === 'image/png'
            || file.mimetype === 'image/jpg') {
            cb(null, path.join(__dirname, '../../uploads/image'));
        }
        else {
            cb(null, path.join(__dirname, '../../uploads/document'));
        }
    },
    // Define the file name based on current timestamp and a random number
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
    }
    else if (file.fieldname === "document") {
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

// Endpoint to add a new project
router.post(
    '/',
    verifyToken,
    checkAdminOrMember,
    upload,
    addProjectController
);

// Endpoint to get all projects
router.get(
    '/',
    getProjectsController);

// Endpoint to get projects by discipline
router.get(
    '/discipline/:discipline',
    getProjectsByDisciplineController);

// Endpoint to get projects by type
router.get(
    '/type/:type',
    getProjectsByTypeController);

// Endpoint to get projects by discipline and type
router.get(
    '/discipline/:discipline/type/:type',
    getProjectsByDisciplineTypeController
);

// Endpoint to to search projects by name or authors
router.get(
    '/search',
    searchProjectsController
);

// Endpoint to get a project by _id
router.get('/id/:id', getProjectByIdController);

// Endpoint to update a project
router.put(
    '/:id',
    verifyToken,
    checkAdminOrMember,
    upload,
    updateProjectController);

// Endpoint to delete a project
router.put(
    '/delete/:id',
    verifyToken,
    checkAdminOrMember,
    deleteProjectController);

module.exports = router;
