const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3010;

const MONGO_URI = "mongodb://localhost:27017/Faculty_DB";

app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => console.log("Faculty Database Connected..."))
  .catch(error => console.error("MongoDB Connection Error:", error));

// Faculty Schema
const facultySchema = new mongoose.Schema({
  name: String,
  department: String,
  hireDate: {
    type: Date,
    default: Date.now
  }
});

// Faculty Model
const Faculty = mongoose.model('Faculty', facultySchema);

/* =========================
   ROUTES
   ========================= */

// Get all faculties
app.get('/faculty', async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.status(200).json(faculties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get faculty by ID
app.get('/faculty/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);

    if (!faculty) {
      return res.status(404).json({ message: "Faculty Not Found" });
    }

    res.status(200).json(faculty);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid Faculty ID" });
  }
});

// Add new faculty
app.post('/faculty', async (req, res) => {
  try {
    const newFaculty = new Faculty(req.body);
    const savedFaculty = await newFaculty.save();

    res.status(201).json(savedFaculty);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Update faculty by ID
app.put('/faculty/:id', async (req, res) => {
  try {
    const updatedFaculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedFaculty) {
      return res.status(404).json({ message: "Faculty Not Found" });
    }

    res.status(200).json(updatedFaculty);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid Faculty ID" });
  }
});

// Delete faculty by ID
app.delete('/faculty/:id', async (req, res) => {
  try {
    const deletedFaculty = await Faculty.findByIdAndDelete(req.params.id);

    if (!deletedFaculty) {
      return res.status(404).json({ message: "Faculty Does Not Exist" });
    }

    res.status(200).json({ message: "Faculty Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
