const router = require("express").Router();
const verifyToken = require("../middlewares/jwtVerification");
const {
  getStatisticsController,
} = require("../controllers/statisticsController");

// Endpoint to get statistics about users and projects
router.get("/", verifyToken, getStatisticsController);

module.exports = router;
