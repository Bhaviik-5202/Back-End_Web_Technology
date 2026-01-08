import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Library() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const API_URL = "http://localhost:5000/api/books";

  const fetchBooks = async (q = "") => {
    try {
      const url = q && q.trim() !== "" ? `${API_URL}?q=${encodeURIComponent(q)}` : API_URL;
      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      console.error("Error fetching books:", err);
      return [];
    }
  };

  useEffect(() => {
    let mounted = true;
    async function load() {
      const data = await fetchBooks();
      if (mounted) setBooks(data);
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSearch = async () => {
    const data = await fetchBooks(query);
    setBooks(data);
  };

  const clearSearch = async () => {
    setQuery("");
    const data = await fetchBooks();
    setBooks(data);
  };

  const toggleAvailability = async (id, makeAvailable) => {
    try {
      await axios.patch(`${API_URL}/${id}/availability`, {
        isAvailable: makeAvailable,
      });
      const data = await fetchBooks();
      setBooks(data);
    } catch (err) {
      console.error("Error updating availability:", err);
      alert("Failed to update availability");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>Library Check In / Check Out</h2>
      <div style={{ marginBottom: 12 }}>
        <input
          placeholder="Search by title, author, ISBN, or category"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: 6, width: "60%", marginRight: 8 }}
        />
        <button onClick={handleSearch} style={{ marginRight: 6, cursor: "pointer" }}>
          Search
        </button>
        <button onClick={clearSearch} style={{ cursor: "pointer" }}>
          Clear
        </button>
      </div>
      <div style={{ marginBottom: 12 }}>
        <Link to="/">← Back to Home</Link>
      </div>

      <table
        border="1"
        cellPadding="8"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4" }}>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Category</th>
            <th>Availability</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                No books found.
              </td>
            </tr>
          )}
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>{book.category || "-"}</td>
              <td>{book.isAvailable ? "Available" : "Checked out"}</td>
              <td>
                {book.isAvailable ? (
                  <button
                    onClick={() => toggleAvailability(book._id, false)}
                    style={{ cursor: "pointer" }}
                  >
                    Check Out
                  </button>
                ) : (
                  <button
                    onClick={() => toggleAvailability(book._id, true)}
                    style={{ cursor: "pointer" }}
                  >
                    Return
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
