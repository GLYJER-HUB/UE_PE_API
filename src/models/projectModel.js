const mongoose = require('mongoose');

// Create the project schema
const projectSchema = new mongoose.Schema({
    project_name: {
        type: String,
        required: true,
        min: 3,
        max: 100
    },

    description: {
        type: String,
        required: true,
        min: 10
    },

    discipline: {
        type: String,
        required: true,
        max: 50
    },

    type: {
        type: String,
        required: true,
        min: 5,
        max: 50
    },

    cover: {
        type: String,
    },

    project_url: {
        type: String,
    },

    pdf_file: {
        type: String
    },

    authors: {
        type: [String],
        required: true,
    },

    deleted: {
        type: Boolean,
        default: false,
        required: true
    },

    added_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    last_modified_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, {
    timestamps: true,
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;