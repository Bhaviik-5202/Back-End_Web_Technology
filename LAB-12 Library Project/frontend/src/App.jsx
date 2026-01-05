import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
  });

  const API_URL = "http://localhost:5000/api/books";

  // Fetch books from Backend
  const fetchBooks = async () => {
    try {
      const res = await axios.get(API_URL);
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Ensure the URL matches your backend's running port (usually 5000)
        const res = await axios.get("http://localhost:5000/api/books");
        setBooks(res.data);
      } catch (err) {
        // This will tell you if it is a Network Error or CORS issue
        console.error("Fetch Error:", err.message);
      }
    };

    fetchBooks();
  }, []);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission (Create Book)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      setFormData({ title: "", author: "", isbn: "", category: "" }); // Reset form
      fetchBooks(); // Refresh list
      alert("Book added successfully!");
    } catch (err) {
      alert("Error adding book: " + err.response?.data?.message);
    }
  };

  // Handle Delete
  const deleteBook = async (id) => {
    if (window.confirm("Delete this book?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchBooks();
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Library Management System</h1>

      {/* ADD BOOK FORM */}
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

      {/* BOOK LIST */}
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
    </div>
  );
}

export default App;
