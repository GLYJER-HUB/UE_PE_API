const Joi = require('joi');

// Define the Joy schema for project validation
const projectValidation = (data) => {
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

module.exports.projectValidation = projectValidation;