const router = require("express").Router();
const verifyToken = require("../middlewares/jwtVerification");
const {
  addLogController,
  updateLogController,
  getLogsController,
} = require("../controllers/userLogController");

// Endpoint to get all logs
router.get("/", verifyToken, getLogsController);

// Endpoint to add a log
router.post("/", verifyToken, addLogController);

// Endpoint to update a log
router.put("/:id", verifyToken, updateLogController);

module.exports = router;
