const dotenv = require('dotenv');
// Load env
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const otpRoutes = require('./routes/otprouters')


const Book = require('./models/Book');
const cors = require("cors");

const DB_URL = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

if (!DB_URL) {
  console.error("❌ Error: MONGO_URI is not defined. Please check your .env file.");
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
mongoose.connect(DB_URL)
  .then(() => console.log("DB connected"))
  .catch(err => {
    console.error("❌ DB Connection Error:", err.message);
    console.error("👉 Please ensure MongoDB is running locally on port 27017 (mongod).");
  });

app.use('/library/book', bookRoutes)
app.use('/library/user', userRoutes)
app.use("/library/otp", otpRoutes);
app.use("/library/activity", require('./routes/activityRoutes'));


// Start Cron Job
const startCronJob = require('./cronScheduler');
startCronJob();



const transporter = require('./config/mailer');

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);

  // Verify SMTP Connection for Debugging

  transporter.verify((error, success) => {
    if (error) {
      console.error("❌ SMTP Connection failed:", error);
    } else {

    }
  });
});
