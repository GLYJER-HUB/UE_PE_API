const userModel = require('../../models/userModel');
const {
    loginController,
    logoutController
} = require('../../controllers/authController');

// Define a mock for user
jest.mock('../../models/userModel');

// Define a fake request object
const request = {
    body: {
        username: "jdoe",
        password: "Jesus123!",
    },
    cookies: {
        jwtToken: "kjshdiufidhj",
    }
};

// Define a fake response object
const response = {
    status: jest.fn((x) => ({
        status: x,
        json: jest.fn((x) => x)
    })),
    clearCookie: jest.fn((x) => x),
};

// Test for invalid username or password
it('should send a status code of 401 when username or password is not valid',
    async () => {
        // Mock the userModel.findOne
        userModel.findOne.mockResolvedValueOnce(null);

        // Call the loginController function
        await loginController(request, response);

        // Expect the response status to be 401
        expect(response.status).toHaveBeenCalledWith(401);
    });


// Test when user logout successfully
it('should send a status code of 205 when user is Logout',
    async () => {
        await logoutController(request, response);
        expect(response.status).toHaveBeenCalledWith(205);
    });