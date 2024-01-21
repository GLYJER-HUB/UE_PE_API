const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Function to create default admin and superadmin users
const createDefaultUsers = async () => {
    try {
        const superadminUser = await User.findOne({ role: 'superadmin' });

        const defaultSuperAdmin = {
          username: "superadmin",
          password: "Jesus123!", 
        };

        // Hash the password 
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(defaultSuperAdmin.password, salt)

        if (!superadminUser) {
            // Create superadmin user
            await User.create({
                username: defaultSuperAdmin.username,
                password: hashedPassword,
                role: 'superadmin',
            });
        }
    } catch (error) {
        console.error('Error creating default users:', error);
    }
};

module.exports = createDefaultUsers;
