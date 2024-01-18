const Joi = require('joi');

// Joi schema for validating the data when a user login
const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(4).max(50).required().messages({
            'any.required': 'Le nom d\'utilisateur est requis.',
            'string.empty': 'Le nom d\'utilisateur ne peut pas être vide.',
            'string.min': 'Le nom d\'utilisateur doit avoir au moins {#limit} caractères.',
            'string.max': 'Le nom d\'utilisateur ne peut pas dépasser {#limit} caractères.',
        }),

        password: Joi.string().min(6).max(1024).required().messages({
            'any.required': 'Le mot de passe est requis.',
            'string.empty': 'Le mot de passe ne peut pas être vide.',
            'string.min': 'Le mot de passe doit avoir au moins {#limit} caractères.',
            'string.max': 'Le mot de passe ne peut pas dépasser {#limit} caractères.',
        }),
    });

    return schema.validate(data);
}

// Joi schema for validating the data when adding a user
const addUserValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(4).max(50).required().messages({
            'any.required': 'Le nom d\'utilisateur est requis.',
            'string.empty': 'Le nom d\'utilisateur ne peut pas être vide.',
            'string.min': 'Le nom d\'utilisateur doit avoir au moins {#limit} caractères.',
            'string.max': 'Le nom d\'utilisateur ne peut pas dépasser {#limit} caractères.',
        }),

        role: Joi.string().min(4).max(20).required().messages({
            'any.required': 'Le rôle est requis.',
            'string.empty': 'Le rôle ne peut pas être vide.',
            'string.min': 'Le rôle doit avoir au moins {#limit} caractères.',
            'string.max': 'Le rôle ne peut pas dépasser {#limit} caractères.',
        }),
    });
    return schema.validate(data);
}

// Joi schema for validating the data when updating a user
const updateUserValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(4).max(50).required().optional().messages({
            'any.required': 'Le nom d\'utilisateur est requis.',
            'string.empty': 'Le nom d\'utilisateur ne peut pas être vide.',
            'string.min': 'Le nom d\'utilisateur doit avoir au moins {#limit} caractères.',
            'string.max': 'Le nom d\'utilisateur ne peut pas dépasser {#limit} caractères.',
        }),

        password: Joi.string().min(6).max(1024).required().optional().messages({
            'any.required': 'Le mot de passe est requis.',
            'string.empty': 'Le mot de passe ne peut pas être vide.',
            'string.min': 'Le mot de passe doit avoir au moins {#limit} caractères.',
            'string.max': 'Le mot de passe ne peut pas dépasser {#limit} caractères.',
        }),

        role: Joi.string().min(4).max(20).required().optional()
            .messages({
                'any.required': 'Le rôle est requis.',
                'string.empty': 'Le rôle ne peut pas être vide.',
                'string.min': 'Le rôle doit avoir au moins {#limit} caractères.',
                'string.max': 'Le rôle ne peut pas dépasser {#limit} caractères.',
            }),
    });
    return schema.validate(data);
}

// Joi schema for validating the data when a user login
const passwordValidation = (data) => {
    const schema = Joi.object({
        password: Joi.string().min(6).max(1024).required().messages({
            'any.required': 'Le mot de passe est requis.',
            'string.empty': 'Le mot de passe ne peut pas être vide.',
            'string.min': 'Le mot de passe doit avoir au moins {#limit} caractères.',
            'string.max': 'Le mot de passe ne peut pas dépasser {#limit} caractères.',
        }),
    });

    return schema.validate(data);
}

module.exports = {
    loginValidation,
    addUserValidation,
    updateUserValidation,
    passwordValidation,
};