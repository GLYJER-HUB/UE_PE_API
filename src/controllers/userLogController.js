const userLogModel = require("../models/userLogModel");
require("dotenv/config");

// Controller to get userLogs
const getLogsController = async (req, res) => {
  try {
    // Retrieve all userlogs from the database
    const allLogs = await userLogModel
      .find()
      .populate("user_id", "username")
      .sort({ last_login: -1 });

    res.status(200).send({ logs: allLogs });
  } catch (error) {
    console.error("Error getting all user logs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

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

module.exports = { getLogsController, addLogController, updateLogController };
