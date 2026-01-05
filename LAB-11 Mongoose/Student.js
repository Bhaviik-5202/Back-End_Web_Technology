const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3070;

const MONGO_URI = "mongodb://localhost:27017/Student_DB";

app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => console.log("Student Database Connected..."))
  .catch(error => console.error("MongoDB Connection Error:", error));

// Student Schema
const studentSchema = new mongoose.Schema({
  name: String,
  department: String,
  email: String,
  age: Number,
  major: String,
  gpa: Number,
  isActive: {
    type: Boolean,
    default: true
  }
});

// Student Model
const Student = mongoose.model('Student', studentSchema);

/* =========================
   ROUTES
   ========================= */

// Get all Students
app.get('/student', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Student by ID
app.get('/student/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student Not Found" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid Student ID" });
  }
});

// Add new Student
app.post('/student', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();

    res.status(201).json(savedStudent);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Update Student by ID
app.put('/student/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student Not Found" });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid Student ID" });
  }
});

// Delete Student by ID
app.delete('/student/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student Does Not Exist" });
    }

    res.status(200).json({ message: "Student Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
