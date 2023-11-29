const router = require('express').Router();
const verifyToken = require('../utils/jwtVerification');
const {
    addProjectController,
} = require('../controllers/projectController');
const multer = require('multer')
const path = require('path');

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
    upload,
    addProjectController
);

module.exports = router;