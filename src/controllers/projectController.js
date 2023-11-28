const projectModel = require('../models/projectModel');
const {
    addProjectValidation
} = require('../utils/projectValidation');


// Controller to add a new project
async function addProjectController(req, res) {
    // Retrieve data from the request
    const { project_name, description, discipline, type, project_url } = req.body;
    const addedBy = req.user;

    // Check the user role
    if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'member')) {
        return res.status(403).json({ message: 'Access denied!' });
    }

    try {
        // Check if data is valid
        const { error } = addProjectValidation(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        // Use Multer to manage the uploading image
        upload.single('cover')(req, res, function (error) {
            if (error instanceof multer.MulterError) {
                // A Multer error occurred while uploading the filer
                return res.status(400).json({ message: 'Error uploading file' });

            } else if (error) {
                // An unexpected error has occurred
                return res.status(500).json({ message: 'Internal server error' });
            }
        })

        // Create a new project document
        const newProject = new projectModel({
            project_name: project_name,
            description: description,
            discipline: discipline,
            type: type,
            cover: req.file ? req.file.path : null,
            project_url: project_url,
            author: addedBy,
            added_by: addedBy,
            last_modified_by: addedBy
        });

        // Save the document to the database
        await newProject.save();

        res.status(201).json({ message: 'Project created successfully', project: newProject });

    } catch (error) {
        console.error('Enter creating project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    addProjectController,
};