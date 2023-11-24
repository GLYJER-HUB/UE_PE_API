const express = require('express');
const cors = require('cors');
require('dotenv/config');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;


// Connect to the database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to database');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


// Launch the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`It's alive on http://localhost:${PORT}`)
    })
})