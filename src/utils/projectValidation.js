const Joi = require('joi');

// Define the Joy schema for project validation
const addProjectValidation = (data) => {
    const schema = Joi.object({
        projectName: Joi.string().min(3).max(100).required(),
        description: Joi.string().min(10).required(),
        discipline: Joi.string().max(50).required(),
        type: Joi.string().min(5).max(50).required(),
        cover: Joi.string().optional(),
        projectUrl: Joi.string().optional(),
        authors: Joi.array().items(Joi.string()),
        yearOfSubmission: Joi.number().invalid().required(),
    });

    return schema.validate(data);
}

const updateProjectValidation = (data) => {
    const schema = Joi.object({
        projectName: Joi.string().min(3).max(100).optional(),
        description: Joi.string().min(10).optional(),
        discipline: Joi.string().max(50).optional(),
        type: Joi.string().min(5).max(50).optional(),
        cover: Joi.string().optional(),
        projectUrl: Joi.string().optional(),
        authors: Joi.array().items(Joi.string()).optional(),
        yearOfSubmission: Joi.number().invalid().optional(),
    });

    return schema.validate(data);
}

module.exports.addProjectValidation = addProjectValidation;
module.exports.updateProjectValidation = updateProjectValidation;