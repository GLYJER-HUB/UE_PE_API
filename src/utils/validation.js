const Joi = require('joi');

// Joi schema for validating the data when a user login
const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(4).max(50).required(),
        password: Joi.string().min(6).max(1024).required(),
    });

    return schema.validate(data);
}

// Joi schema for validating the data when adding a user
const addUserValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(4).max(50).required(),
        password: Joi.string().min(6).max(1024).required(),
        role: Joi.string().min(4).max(20).required(),
    });
    return schema.validate(data);
}

// Joi schema for validating the data when updating a user
const updateUserValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(4).max(50).required().optional(),
        password: Joi.string().min(6).max(1024).required().optional(),
        role: Joi.string().min(4).max(20).required().optional(),
    });
    return schema.validate(data);
}

module.exports.loginValidation = loginValidation;
module.exports.addUserValidation = addUserValidation;
module.exports.updateUserValidation = updateUserValidation;