const express = require('express');
const cors = require('cors');
require('dotenv/config');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;


// Connect to the database
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to database');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


// Add middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());


// Add routes middlewares
app.use('/api/auth', authRoutes);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`It's alive on http://localhost:${PORT}`)
    })
})