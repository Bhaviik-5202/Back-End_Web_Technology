import { useEffect, useState } from "react";
import axios from "axios";

// MockAPI.io returns data directly, not wrapped in { data: [...] }
const API = "https://6881dcdf66a7eb81224c58b1.mockapi.io/Books";

export default function DeleteBook() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API);
      // MockAPI returns array directly, not res.data.data
      setBooks(res.data || []);
    } catch (err) {
      setMessage("Failed to load books. Please try again.");
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    setDeletingId(id);
    setMessage("");

    try {
      await axios.delete(`${API}/${id}`);
      // MockAPI uses 'id' field, not '_id'
      setBooks(books.filter((b) => b.id !== id));
      setMessage(`✅ "${title}" deleted successfully!`);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("❌ Failed to delete book. Please try again.");
      console.error("Error deleting book:", err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Manage Books</h2>
        <p style={styles.subtitle}>Delete books from the library</p>
      </div>

      {message && (
        <div style={message.includes("✅") ? styles.success : styles.error}>
          {message}
        </div>
      )}

      {loading ? (
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <p>Loading books...</p>
        </div>
      ) : books.length === 0 ? (
        <div style={styles.empty}>
          <p style={styles.emptyText}>No books available to delete</p>
          <p style={styles.emptyHint}>Add some books first</p>
        </div>
      ) : (
        <div style={styles.booksList}>
          <div style={styles.listHeader}>
            <span style={styles.headerText}>Book List</span>
            <span style={styles.count}>
              {books.length} {books.length === 1 ? "book" : "books"}
            </span>
          </div>

          {books.map((book) => (
            <div key={book.id} style={styles.bookItem}>
              <div style={styles.bookInfo}>
                <h4 style={styles.bookTitle}>{book.title}</h4>
                <div style={styles.bookDetails}>
                  <span style={styles.author}>by {book.author}</span>
                  <span style={styles.isbn}>ISBN: {book.isbn}</span>
                  {book.category && (
                    <span style={styles.category}>{book.category}</span>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleDelete(book.id, book.title)}
                style={styles.deleteButton}
                disabled={deletingId === book.id}
              >
                {deletingId === book.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "24px 20px",
    minHeight: "calc(100vh - 70px)",
  },

  header: {
    marginBottom: "32px",
  },

  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "8px",
  },

  subtitle: {
    fontSize: "16px",
    color: "#6b7280",
    margin: 0,
  },

  loading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 0",
  },

  spinner: {
    width: "40px",
    height: "40px",
    border: "3px solid #e5e7eb",
    borderTopColor: "#dc2626",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "16px",
  },

  empty: {
    textAlign: "center",
    padding: "60px 20px",
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    border: "2px dashed #d1d5db",
  },

  emptyText: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#4b5563",
    marginBottom: "8px",
  },

  emptyHint: {
    fontSize: "14px",
    color: "#9ca3af",
    margin: 0,
  },

  success: {
    backgroundColor: "#d1fae5",
    color: "#065f46",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #a7f3d0",
    marginBottom: "20px",
    fontSize: "14px",
  },

  error: {
    backgroundColor: "#fef2f2",
    color: "#dc2626",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #fecaca",
    marginBottom: "20px",
    fontSize: "14px",
  },

  booksList: {
    backgroundColor: "white",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  },

  listHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    backgroundColor: "#f9fafb",
    borderBottom: "1px solid #e5e7eb",
  },

  headerText: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1f2937",
  },

  count: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#6b7280",
    backgroundColor: "#e5e7eb",
    padding: "4px 12px",
    borderRadius: "20px",
  },

  bookItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    borderBottom: "1px solid #f3f4f6",
    transition: "all 0.2s",
    "&:hover": {
      backgroundColor: "#f9fafb",
    },
    "&:last-child": {
      borderBottom: "none",
    },
  },

  bookInfo: {
    flex: 1,
    marginRight: "20px",
  },

  bookTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1f2937",
    margin: "0 0 8px 0",
  },

  bookDetails: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    fontSize: "14px",
    color: "#6b7280",
  },

  author: {
    color: "#4b5563",
  },

  isbn: {
    fontFamily: "monospace",
    backgroundColor: "#f3f4f6",
    padding: "2px 6px",
    borderRadius: "4px",
  },

  category: {
    backgroundColor: "#e0e7ff",
    color: "#3730a3",
    padding: "2px 8px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "500",
  },

  deleteButton: {
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: "600",
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s",
    minWidth: "90px",
    "&:hover": {
      backgroundColor: "#b91c1c",
      transform: "translateY(-1px)",
    },
    "&:active": {
      transform: "translateY(0)",
    },
    "&:disabled": {
      backgroundColor: "#fca5a5",
      cursor: "not-allowed",
      transform: "none",
    },
  },

  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
};
