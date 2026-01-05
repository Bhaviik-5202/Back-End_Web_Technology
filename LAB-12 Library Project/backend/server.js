const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const bookRoutes = require("./routes/books");
app.use("/api/books", bookRoutes);

const MONGO_URI = "mongodb://localhost:27017/Library_DB";
const PORT = 5000;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected...."))
  .catch((err) => console.error("Database Connection Error:", err));

app.get("/", (req, res) => {
  res.send("Library Management System API is running...");
});

app.listen(PORT, () => {
  console.log(`Server Starting At @5000`);
});
