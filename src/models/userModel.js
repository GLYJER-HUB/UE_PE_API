const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_name: {
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
        min: 4,
        max: 20
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