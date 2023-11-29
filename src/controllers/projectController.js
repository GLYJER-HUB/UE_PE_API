const projectModel = require('../models/projectModel');
const {
    projectValidation
} = require('../utils/projectValidation');

// Controller to add a new project
async function addProjectController(req, res) {
    // Retrieve data from the request
    const coverPath = `uploads\\image\\${req.files.image[0].filename}`;
    const pdfPath = `uploads\\document\\${req.files.document[0].filename}`;

    const {
        projectName,
        description,
        discipline,
        type,
        projectUrl,
        authors,
        yearOfSubmission
    } = req.body;

    const addedBy = req.user ? req.user.userId : null;

    // Check the user role
    if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'member')) {
        return res.status(403).json({ message: 'Access denied!' });
    }

    try {
        // Check if data is valid
        const { error } = projectValidation(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        // Create a new project document
        const newProject = new projectModel({
            project_name: projectName,
            description: description,
            discipline: discipline,
            type: type,
            cover: coverPath,
            pdf_file: pdfPath,
            project_url: projectUrl,
            authors: authors,
            year_of_submission: yearOfSubmission,
            added_by: addedBy,
            last_modified_by: addedBy
        });

        // Save the document to the database
        await newProject.save();

        res.status(201).json({ message: 'Project created successfully', project: newProject });

    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    addProjectController,
};