import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Library from "./Library.jsx";

function Home() {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
  });

  const API_URL = "http://localhost:5000/api/books";

  const fetchBooks = async () => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (err) {
      console.error("Error fetching books:", err);
      return [];
    }
  };

  useEffect(() => {
    let mounted = true;

    async function loadBooks() {
      const books = await fetchBooks();
      if (mounted) setBooks(books);
    }

    loadBooks();
    return () => {
      mounted = false;
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      setFormData({ title: "", author: "", isbn: "", category: "" });
      const booksData = await fetchBooks();
      setBooks(booksData);
      alert("Book added successfully!");
    } catch (err) {
      alert("Error adding book: " + err.response?.data?.message);
    }
  };

  const deleteBook = async (id) => {
    if (window.confirm("Delete this book?")) {
      await axios.delete(`${API_URL}/${id}`);
      const booksData = await fetchBooks();
      setBooks(booksData);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Library Management System</h1>

      <div
        style={{
          marginBottom: "30px",
          padding: "15px",
          border: "1px solid #ddd",
        }}
      >
        <h3>Add New Book</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            required
          />
          <input
            name="isbn"
            placeholder="ISBN"
            value={formData.isbn}
            onChange={handleChange}
            required
          />
          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#28a745",
              color: "white",
              cursor: "pointer",
            }}
          >
            Add Book
          </button>
        </form>
      </div>

      <h3>Available Books</h3>
      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4" }}>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>
                <button
                  onClick={() => deleteBook(book._id)}
                  style={{ color: "red" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 20 }}>
        <Link to="/library">Go to Library In/Out</Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </BrowserRouter>
  );
}
