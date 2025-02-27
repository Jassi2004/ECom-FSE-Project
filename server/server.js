require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

// Initialize Express App
const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON requests

// MySQL Database Connection
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME
// });

// db.connect(err => {
//   if (err) {
//     console.error("Database connection failed:", err);
//     return;
//   }
//   console.log("✅ MySQL Database Connected!");
// });

// Test Route
app.get("/", (req, res) => {
  res.send("Welcome to eCommerce API 🚀");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
