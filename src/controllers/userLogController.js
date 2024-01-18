const userLogModel = require("../models/userLogModel");
require("dotenv/config");

// Controller to add a new userLog
const addLogController = async (userId, loginTime, logoutTime) => {
  try {
    // Create a new userLog document
    const newUserLog = new userLogModel({
      user_id: userId,
      last_login: loginTime,
      last_logout: logoutTime,
    });

    // Save the document to the database
    await newUserLog.save();
    return newUserLog._id;
  } catch (error) {
    console.error("Error adding UserLog:", error);
  }
};

// Controller to update a userLog
const updateLogController = async (logId, logoutTime) => {
  try {
    await userLogModel.findOneAndUpdate(
      { _id: logId },
      { last_logout: logoutTime }
    );
  } catch (error) {
    console.error("Error updating userLog:", error);
  }
};

module.exports = { addLogController, updateLogController };
