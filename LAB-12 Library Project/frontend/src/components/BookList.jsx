import React, { useEffect, useState } from "react";
import { listBooks, createBook, updateBook, deleteBook } from "../api";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    copies: 1,
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    const data = await listBooks();
    setBooks(data || []);
  }

  async function onSubmit(e) {
    e.preventDefault();
    await createBook(form);
    setForm({ title: "", author: "", isbn: "", copies: 1 });
    fetchBooks();
  }

  async function onDelete(id) {
    if (!confirm("Delete this book?")) return;
    await deleteBook(id);
    fetchBooks();
  }

  return (
    <div>
      <form onSubmit={onSubmit} style={{ marginBottom: 20 }}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          required
        />
        <input
          placeholder="ISBN"
          value={form.isbn}
          onChange={(e) => setForm({ ...form, isbn: e.target.value })}
        />
        <input
          type="number"
          min="1"
          value={form.copies}
          onChange={(e) => setForm({ ...form, copies: Number(e.target.value) })}
        />
        <button type="submit">Add Book</button>
      </form>

      <ul>
        {books.map((b) => (
          <li key={b._id} style={{ marginBottom: 8 }}>
            <strong>{b.title}</strong> — {b.author} (copies: {b.copies})
            <button onClick={() => onDelete(b._id)} style={{ marginLeft: 8 }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
