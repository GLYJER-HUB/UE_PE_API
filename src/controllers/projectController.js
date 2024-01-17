const projectModel = require("../models/projectModel");
const {
  addProjectValidation,
  updateProjectValidation,
} = require("../utils/projectValidation");

// Controller to add a new project
async function addProjectController(req, res) {
  // Retrieve data from the request
  let coverPath = null;
  let pdfPath = null;
  if (Object.keys(req.files).length !== 0) {
    // Check if the 'image' property exists in req.files
    if (req.files.image && req.files.image.length > 0) {
      coverPath = `files/image/${req.files.image[0].filename}`;
    }

    // Check if the 'document' property exists in req.files
    if (req.files.document && req.files.document.length > 0) {
      pdfPath = `files/document/${req.files.document[0].filename}`;
    }
  } else {
    return res.status(400).json({ message: "Le document PDF du projet est requis." });
  }

  const {
    projectName,
    description,
    discipline,
    type,
    projectUrl,
    authors,
    yearOfSubmission,
  } = req.body;

  const addedBy = req.user ? req.user.userId : null;

  try {
    // Check if data is valid
    const { error } = addProjectValidation(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

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
      last_modified_by: addedBy,
    });

    // Save the document to the database
    await newProject.save();

    res.status(201).json({
      message: "Projet créé avec succès.",
      project: newProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller to get all projects
async function getProjectsController(req, res) {
  try {
    // Retrieve all projects from the database
    const allProjects = await projectModel
      .find({ deleted: false })
      .populate([
        { path: "added_by", select: "username" },
        { path: "last_modified_by", select: "username" },
      ])
      .sort({ createdAt: -1 });

    res.status(200).send({ projects: allProjects });
  } catch (error) {
    console.error("Error getting all projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller to get projects by discipline
async function getProjectsByDisciplineController(req, res) {
  const { discipline } = req.params;
  try {
    // Retrieve all projects from the database by discipline
    const allProjects = await projectModel
      .find({ discipline: discipline, deleted: false })
      .populate([
        { path: "added_by", select: "username" },
        { path: "last_modified_by", select: "username" },
      ])
      .sort({ createdAt: -1 });

    res.status(200).send({ projects: allProjects });
  } catch (error) {
    console.error("Error getting all projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller to get projects by type
async function getProjectsByTypeController(req, res) {
  const { type } = req.params;
  try {
    // Retrieve all projects from the database by type
    const allProjects = await projectModel
      .find({ type: type, deleted: false })
      .populate([
        { path: "added_by", select: "username" },
        { path: "last_modified_by", select: "username" },
      ])
      .sort({ createdAt: -1 });

    res.status(200).send({ projects: allProjects });
  } catch (error) {
    console.error("Error getting all projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller to get projects by type and discipline
async function getProjectsByDisciplineTypeController(req, res) {
  const { discipline, type } = req.params;
  try {
    // Retrieve all projects from the database by discipline and type
    const allProjects = await projectModel
      .find({ discipline: discipline, type: type, deleted: false })
      .populate([
        { path: "added_by", select: "username" },
        { path: "last_modified_by", select: "username" },
      ])
      .sort({ createdAt: -1 });

    res.status(200).send({ projects: allProjects });
  } catch (error) {
    console.error("Error getting all projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller to search projects by name or authors
async function searchProjectsController(req, res) {
  const { query } = req.query;
  try {
    // Search for projects by name or authors
    const searchResults = await projectModel
      .find({
        $or: [
          { project_name: { $regex: query, $options: "i" } },
          { authors: { $regex: query, $options: "i" } },
        ],
        deleted: false,
      })
      .populate([
        { path: "added_by", select: "username" },
        { path: "last_modified_by", select: "username" },
      ]);

    res.status(200).send({ projects: searchResults });
  } catch (error) {
    console.error("Error seaching projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller to get a project by _id
async function getProjectByIdController(req, res) {
  // Retrieve the id from the request params
  const { id } = req.params;

  try {
    const project = await projectModel
      .findOne({ _id: id, deleted: false })
      .populate([
        { path: "added_by", select: "username" },
        { path: "last_modified_by", select: "username" },
      ]);

    if (!project) {
      return res.status(404).json({ message: "Projet non trouvé." });
    }

    res.status(200).send(project);
  } catch (error) {
    console.error("Error getting the project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller to update a project
async function updateProjectController(req, res) {
  // Retrieve data from the request
  let coverPath = null;
  let pdfPath = null;
  if (Object.keys(req.files).length !== 0) {
    // Check if the 'image' property exists in req.files
    if (req.files.image && req.files.image.length > 0) {
      coverPath = `files/image/${req.files.image[0].filename}`;
    }

    // Check if the 'document' property exists in req.files
    if (req.files.document && req.files.document.length > 0) {
      pdfPath = `files/document/${req.files.document[0].filename}`;
    }
  }

  const {
    projectName,
    description,
    discipline,
    type,
    projectUrl,
    authors,
    yearOfSubmission,
  } = req.body;

  const addedBy = req.user ? req.user.userId : null;
  const { id } = req.params;

  try {
    // Check if data is valid
    const { error } = updateProjectValidation(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // Find the project to update
    const projectToUpdate = await projectModel.findById(id);

    // Check if the project exists
    if (!projectToUpdate) {
      return res.status(404).json({ message: "Projet non trouvé." });
    }

    // Update the document in the database
    await projectToUpdate.updateOne({
      project_name: projectName ? projectName : projectToUpdate.project_name,
      description: description ? description : projectToUpdate.description,
      discipline: discipline ? discipline : projectToUpdate.discipline,
      type: type ? type : projectToUpdate.type,
      cover: coverPath ? coverPath : projectToUpdate.cover,
      pdf_file: pdfPath ? pdfPath : projectToUpdate.pdf_file,
      project_url: projectUrl ? projectUrl : projectToUpdate.project_url,
      authors: authors ? authors : projectToUpdate.authors,
      year_of_submission: yearOfSubmission
        ? yearOfSubmission
        : projectToUpdate.year_of_submission,
      added_by: addedBy,
      last_modified_by: addedBy,
    });

    res.status(200).json({
      message: "Projet mis à jour avec succès.",
      project: projectToUpdate,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller to delete a project
async function deleteProjectController(req, res) {
  // Retrieve the id from the request params
  const { id } = req.params;

  try {
    await projectModel.findByIdAndUpdate(id, { deleted: true });
    res.status(200).send({ message: "Projet supprimé avec succès." });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  addProjectController,
  getProjectsController,
  getProjectsByDisciplineController,
  getProjectByIdController,
  getProjectsByTypeController,
  getProjectsByDisciplineTypeController,
  updateProjectController,
  deleteProjectController,
  searchProjectsController,
};
