const mongoose = require('mongoose');

// Create the user schema
const userLogSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true
    },

    last_login: {
        type: Date,
    },

    last_logout: {
        type: Date,
    },
});


const UserLog = mongoose.model('userLog', userLogSchema);
module.exports = UserLog;