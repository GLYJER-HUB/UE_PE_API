const Joi = require('joi');

// Define the Joy schema for project validation
const projectValidation = (data) => {
    const schema = Joi.object({
        project_name: Joi.string().min(3).max(100).required(),
        description: Joi.string().min(10).required(),
        discipline: Joi.string().max(50).required(),
        type: Joi.string().min(5).max(50).required(),
        cover: Joi.string().optional(),
        project_url: Joi.string().optional(),
        pdf_file: Joi.string().optional(),
        authors: Joi.array().items(Joi.string()).required(),
    });

    return schema.validate(data);
}

module.exports.projectValidation = projectValidation;