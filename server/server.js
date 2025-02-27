import "dotenv/config";
import express from "express";
import cors from "cors";
import User from "./db/models/user.js";
import sequelize from "./db/config.js";

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
app.get("/", async (req, res) => {
  res.send("Welcome to eCommerce API 🚀");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// sequelize.sync({ force: true });
sequelize.sync();

// const jane = await User.create({
//   userName: "test2",
//   email: "test2@test.com",
//   password: "testPass2",
// });
// console.log("Jane's auto-generated ID:", jane.id);

const users = await User.findAll();
console.log("All users:", JSON.stringify(users, null, 2));
