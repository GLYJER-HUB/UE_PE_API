const mongoose = require('mongoose');

const roleEnum = ['admin', 'member'];

// Create the user schema
const userSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },

    modified_by: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }
}, {
    timestamps: true,
}
);


const User = mongoose.model('User', userSchema);
module.exports = User;