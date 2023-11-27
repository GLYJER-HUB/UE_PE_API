const jwt = require('jsonwebtoken');
require('dotenv/config');

// Middleware to check for a valid token in the cookie
const verifyToken = (req, res, next) => {
    // Retrieve the token from the cookie
    const { jwtToken } = req.cookies;

    // Check is the token is empty
    if (!jwtToken) return res.status(401).json({ message: 'Access denied: No token provided' });

    try {
        // Verify the token
        const user = jwt.verify(jwtToken, process.env.JWT_SECRET);

        // Attach the decoded user information to the request object
        req.user = user;

        // Move to the next middleware
        next();
    } catch (error) {
        res.status(403).send({ message: 'Invalid token!' });
    }
}

module.exports = verifyToken;