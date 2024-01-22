require('dotenv/config');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const userLogRoutes = require('./routes/userLogRoutes');
const projectRoutes = require('./routes/projectRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const createDefaultUsers = require('./utils/userSeed');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database");

    // Create default admin and superadmin users if they don't exist
    await createDefaultUsers();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    credentials: true, origin: [
        "https://www.euexample.app",
    ]
}));
app.use("/files", express.static(__dirname + "/../uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/logs", userLogRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/statistics", statisticsRoutes);

// Launch the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`It's alive on http://localhost:${PORT}`)
    })
})
