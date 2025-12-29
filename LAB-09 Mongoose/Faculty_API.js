const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;
const DB_API = "mongodb://localhost:27017/Faculty_DB";


app.use(express.json());

// MongoDB Connection
mongoose.connect(DB_API)
  .then(() => console.log("Faculty Database Connected..."))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Schema
const FacultySchema = new mongoose.Schema({
  name: String,
  department: String,        
  hireDate: {                
    type: Date,
    default: Date.now
  }
});

// Model
const Faculty = mongoose.model('Faculty', FacultySchema);

// CREATE Faculty
app.post('/api/faculty', async (req, res) => {
  try {
      const newFaculty = new Faculty(req.body);
      const savedFaculty = await newFaculty.save();
      res.status(201).json(savedFaculty);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
  }
});

// READ All Faculties
app.get('/api/faculty', async (req, res) => {
  try {
        const faculties = await Faculty.find();
        res.json(faculties);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// READ Faculty by ID
app.get('/api/faculty/:id', async (req, res) => {
  try {
      const faculty = await Faculty.findById(req.params.id);
      if (!faculty) {
        return res.status(404).send("Faculty Not Found");
      }
      res.json(faculty);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Invalid Faculty ID" });
    }
});

// UPDATE Faculty
// DELETE Faculty





app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});