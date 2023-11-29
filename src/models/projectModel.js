const mongoose = require('mongoose');

// Define discipline and type enums
const disciplineEnum = ['Informatique', 'Comptabilité', 'Gestion', 'Éducation'];
const typeEnum = [
    'App mobile',
    'Web application',
    'Desktop application',
    'Plan d\'affaire',
    'Système comptable',
    'Rédaction de projet',
    'Mémoire'
];

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
        enum: disciplineEnum
    },

    type: {
        type: String,
        required: true,
        enum: typeEnum
    },

    cover: {
        type: String,
    },

    pdf_file: {
        type: String
    },

    project_url: {
        type: String,
    },

    authors: {
        type: [String],
        required: true,
    },

    year_of_submission: {
        type: Number,
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