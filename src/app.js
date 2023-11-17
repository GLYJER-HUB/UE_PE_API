const express = require('express');
const cors = require('cors');
require('dotenv/config');
const app = express();

// Add middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


// Add routes middlewares


// launch the server
port = process.env.PORT || 3000;
app.listen(
    port,
    () => console.log(`It's alive on http://localhost:${port}`)
);