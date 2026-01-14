import { useState } from "react";
import axios from "axios";

const API = "https://6881dcdf66a7eb81224c58b1.mockapi.io/Books";

export default function AddBook() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.author.trim() || !form.isbn.trim()) {
      setMessage("Title, Author, and ISBN are required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await axios.post(API, form);
      setMessage("✅ Book added successfully!");
      setForm({ title: "", author: "", isbn: "", category: "" });
    } catch (err) {
      setMessage("❌ Failed to add book. Please try again.");
      console.error("Error adding book:", err);
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Add New Book</h2>
        <p style={styles.subtitle}>Fill in the book details below</p>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Title *</label>
          <input
            name="title"
            placeholder="Enter book title"
            value={form.title}
            onChange={handleChange}
            style={styles.input}
            required
            disabled={loading}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Author *</label>
          <input
            name="author"
            placeholder="Enter author name"
            value={form.author}
            onChange={handleChange}
            style={styles.input}
            required
            disabled={loading}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>ISBN *</label>
          <input
            name="isbn"
            placeholder="Enter ISBN number"
            value={form.isbn}
            onChange={handleChange}
            style={styles.input}
            required
            disabled={loading}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Category</label>
          <input
            name="category"
            placeholder="Enter category (optional)"
            value={form.category}
            onChange={handleChange}
            style={styles.input}
            disabled={loading}
          />
        </div>

        {message && (
          <div style={message.includes("✅") ? styles.success : styles.error}>
            {message}
          </div>
        )}

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "24px 20px",
    minHeight: "calc(100vh - 70px)",
  },

  header: {
    marginBottom: "32px",
    textAlign: "center",
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

  form: {
    backgroundColor: "white",
    padding: "32px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  },

  formGroup: {
    marginBottom: "24px",
  },

  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "8px",
  },

  input: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "16px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    outline: "none",
    transition: "all 0.2s",
    boxSizing: "border-box",
    "&:focus": {
      borderColor: "#2563eb",
      boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)",
    },
    "&:disabled": {
      backgroundColor: "#f3f4f6",
      cursor: "not-allowed",
    },
  },

  button: {
    width: "100%",
    padding: "14px",
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
    marginTop: "8px",
    "&:hover": {
      backgroundColor: "#1d4ed8",
      transform: "translateY(-1px)",
    },
    "&:active": {
      transform: "translateY(0)",
    },
    "&:disabled": {
      backgroundColor: "#93c5fd",
      cursor: "not-allowed",
      transform: "none",
    },
  },

  success: {
    backgroundColor: "#d1fae5",
    color: "#065f46",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #a7f3d0",
    marginBottom: "20px",
    fontSize: "14px",
    textAlign: "center",
  },

  error: {
    backgroundColor: "#fef2f2",
    color: "#dc2626",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #fecaca",
    marginBottom: "20px",
    fontSize: "14px",
    textAlign: "center",
  },
};
