require('dotenv/config');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const userLogRoutes = require('./routes/userLogRoutes');
const projectRoutes = require('./routes/projectRoutes');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const createDefaultUsers = require('./utils/userSeed');
const swaggerUi = require('swagger-ui-express');
const sitemap = require('express-sitemap-html');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerSpec = require('./swagger.json');

const app = express();
const PORT = process.env.PORT || 3000;
const options = {
    definition: {
      openapi: '3.1.0',
      info: {
        title: 'UE API',
        version: '1.0.0',
        description: 'This is a Classification API application made with Express and documented with swagger',
      },
      servers: [
        {
          url: `http://localhost:${PORT}`,
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  
  const specs = swaggerJsdoc(options);  // Assurez-vous que cette ligne est présente
  
  // Utilisez Swagger UI à l'URL /api-docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true}));
  

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
        "http://localhost:3000",
        "http://localhost:5173",
        "*"
    ]
}));
app.use("/files", express.static(__dirname + "/../uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/logs", userLogRoutes);
app.use("/api/projects", projectRoutes);

//sitemap.swaggerJSDoc('UE_PE_API',authRoutes);
//sitemap.swagger('UE_PE_API - Documentation', app);

// Launch the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`It's alive on http://localhost:${PORT}`)
    })
})