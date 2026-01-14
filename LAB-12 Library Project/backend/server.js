const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const bookRoutes = require("./routes/bookRoutes");
app.use("/api/books", bookRoutes);

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Library_Project";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("MongoDB Connection Failed:", err.message);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Library Management System API is running",
  });
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
