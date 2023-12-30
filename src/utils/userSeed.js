const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Function to create default admin and superadmin users
const createDefaultUsers = async () => {
    try {
        const adminUser = await User.findOne({ role: 'admin' });
        const superadminUser = await User.findOne({ role: 'superadmin' });

        // Hash the password 
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync("Jesus123!", salt)

        if (!adminUser) {
            // Create admin user
            await User.create({
                username: 'admin',
                password: hashedPassword,
                role: 'admin',
            });
        }

        if (!superadminUser) {
            // Create superadmin user
            await User.create({
                username: 'superadmin',
                password: hashedPassword,
                role: 'superadmin',
            });
        }
    } catch (error) {
        console.error('Error creating default users:', error);
    }
};

module.exports = createDefaultUsers;