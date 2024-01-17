const Joi = require('joi');

// Define the Joy schema for project validation
const addProjectValidation = (data) => {
    const schema = Joi.object({
        projectName: Joi.string().min(3).max(100).required().messages({
            'any.required': 'Le nom du projet est requis.',
            'string.empty': 'Le nom du projet ne peut pas être vide.',
            'string.min': 'Le nom du projet doit avoir au moins {#limit} caractères.',
            'string.max': 'Le nom du projet ne peut pas dépasser {#limit} caractères.',
        }),

        description: Joi.string().min(10).required().messages({
            'any.required': 'La description est requise.',
            'string.empty': 'La description ne peut pas être vide.',
            'string.min': 'La description doit avoir au moins {#limit} caractères.',
        }),

        discipline: Joi.string().max(50).required().messages({
            'any.required': 'La discipline est requise.',
            'string.empty': 'La discipline ne peut pas être vide.',
            'string.max': 'La discipline ne peut pas dépasser {#limit} caractères.',
        }),

        type: Joi.string().min(5).max(50).required().messages({
            'any.required': 'Le type est requis.',
            'string.empty': 'Le type ne peut pas être vide.',
            'string.min': 'Le type doit avoir au moins {#limit} caractères.',
            'string.max': 'Le type ne peut pas dépasser {#limit} caractères.',
        }),

        cover: Joi.string().optional(),

        projectUrl: Joi.string().uri().allow('').messages({
            'string.uri': 'L\'URL du projet doit être une URL valide.',
        }),

        authors: Joi.array().items(Joi.string()),

        yearOfSubmission: Joi.number().invalid().required().messages({
            'any.required': 'L\'année de soumission est requise.',
            'number.invalid': 'L\'année de soumission doit être un nombre valide.',
        }),
    });

    return schema.validate(data);
}

const updateProjectValidation = (data) => {
    const schema = Joi.object({
        projectName: Joi.string().min(3).max(100).optional().messages({
            'any.required': 'Le nom du projet est requis.',
            'string.empty': 'Le nom du projet ne peut pas être vide.',
            'string.min': 'Le nom du projet doit avoir au moins {#limit} caractères.',
            'string.max': 'Le nom du projet ne peut pas dépasser {#limit} caractères.',
        }),

        description: Joi.string().min(10).optional().messages({
            'any.required': 'La description est requise.',
            'string.empty': 'La description ne peut pas être vide.',
            'string.min': 'La description doit avoir au moins {#limit} caractères.',
        }),

        discipline: Joi.string().max(50).optional().messages({
            'any.required': 'La discipline est requise.',
            'string.empty': 'La discipline ne peut pas être vide.',
            'string.max': 'La discipline ne peut pas dépasser {#limit} caractères.',
        }),

        type: Joi.string().min(5).max(50).optional().messages({
            'any.required': 'Le type est requis.',
            'string.empty': 'Le type ne peut pas être vide.',
            'string.min': 'Le type doit avoir au moins {#limit} caractères.',
            'string.max': 'Le type ne peut pas dépasser {#limit} caractères.',
        }),

        cover: Joi.string().optional(),

        projectUrl: Joi.string().uri().allow('').messages({
            'string.uri': 'L\'URL du projet doit être une URL valide.',
        }),

        authors: Joi.array().items(Joi.string()).optional(),

        yearOfSubmission: Joi.number().invalid().optional().messages({
            'any.required': 'L\'année de soumission est requise.',
            'number.invalid': 'L\'année de soumission doit être un nombre valide.',
        }),
    });

    return schema.validate(data);
}

module.exports.addProjectValidation = addProjectValidation;
module.exports.updateProjectValidation = updateProjectValidation;
