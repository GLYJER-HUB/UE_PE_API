const mongoose = require('mongoose');

const roleEnum = ['admin', 'member', 'superadmin',];

// Create the user schema
const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => uuidv4()
    },
    username: {
        type: String,
        required: true,
        unique: true,
        min: 4,
        max: 50
    },

    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },

    role: {
        type: String,
        required: true,
        enum: roleEnum
    },

    deleted: {
        type: Boolean,
        default: false
    },

    added_by: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        default: null
    },

    modified_by: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        default: null
    }
}, {
    timestamps: true,
}
);


const User = mongoose.model('User', userSchema);
module.exports = User;