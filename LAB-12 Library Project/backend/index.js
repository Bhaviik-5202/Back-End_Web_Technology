const dotenv = require('dotenv');
// Load env
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

// Routes
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const otpRoutes = require('./routes/otpRoutes');
const activityRoutes = require('./routes/activityRoutes');

const startCronJob = require('./cronScheduler');
const transporter = require('./config/mailer');

const DB_URL = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

if (!DB_URL) {
  console.error("❌ Error: MONGO_URI is not defined. Please check your .env file.");
  process.exit(1);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
mongoose.connect(DB_URL)
  .then(() => console.log("DB connected"))
  .catch(err => {
    console.error("❌ DB Connection Error:", err.message);
    console.error("👉 Please ensure MongoDB is running locally on port 27017 (mongod).");
  });

// Routes
app.use('/library/book', bookRoutes);
app.use('/library/user', userRoutes);
app.use("/library/otp", otpRoutes);
app.use("/library/activity", activityRoutes);

// Cron Job
startCronJob();

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);

  // Verify SMTP Connection for Debugging
  transporter.verify((error, success) => {
    if (error) {
      console.error("❌ SMTP Connection failed:", error);
    } else {
      console.log("✅ SMTP Connection established");
    }
  });
});
