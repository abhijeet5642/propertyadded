import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path"; // <-- ADD THIS LINE
import { fileURLToPath } from "url"; // <-- ADD THIS LINE
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.js";
import propertyRoutes from "./routes/properties.js";
import userRoutes from "./routes/users.js";
import helmet from "helmet";

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// These lines are needed to use __dirname with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Body parser
app.use(bodyParser.json());
app.use(express.json());


// Helmet CSP settings
app.use((req, res, next) => {
  res.removeHeader("Content-Security-Policy");
  next();
});



// Enable CORS
app.use(cors({
 origin: 'http://localhost:5173' // Replace with your frontend's URL
}));

// Set the 'uploads' folder as a static folder
// This makes images accessible via URLs like http://localhost:5000/uploads/image.jpg
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Mount routers
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/users", userRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5001;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
