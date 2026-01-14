import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://6881dcdf66a7eb81224c58b1.mockapi.io/Books";

const BOOKS_PER_PAGE = 5;

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(API)
      .then((res) => {
        setBooks(res.data || []);
      })
      .catch(() => {
        console.log("Backend not connected");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(books.length / BOOKS_PER_PAGE);

  // Get books for current page
  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
  const endIndex = startIndex + BOOKS_PER_PAGE;
  const currentBooks = books.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>Library Collection</h2>
        <div style={styles.headerInfo}>
          <p style={styles.count}>{books.length} books</p>
          {books.length > BOOKS_PER_PAGE && (
            <p style={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>
      </div>

      {loading ? (
        <p style={styles.message}>Loading books...</p>
      ) : books.length === 0 ? (
        <p style={styles.message}>No books in library</p>
      ) : (
        <>
          <div style={styles.grid}>
            {currentBooks.map((book) => (
              <div key={book.id} style={styles.card}>
                <h3 style={styles.bookTitle}>{book.title}</h3>
                <p>
                  <b>Author:</b> {book.author}
                </p>
                <p>
                  <b>ISBN:</b> <span style={styles.isbn}>{book.isbn}</span>
                </p>
                {book.category && (
                  <p>
                    <b>Category:</b>{" "}
                    <span style={styles.category}>{book.category}</span>
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Pagination - Only show if more than 10 books */}
          {books.length > BOOKS_PER_PAGE && (
            <div style={styles.pagination}>
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                style={{
                  ...styles.pageButton,
                  ...(currentPage === 1 && styles.disabledButton),
                }}
              >
                ← Previous
              </button>

              <div style={styles.pageNumbers}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      style={{
                        ...styles.pageNumber,
                        ...(currentPage === page && styles.activePage),
                      }}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                style={{
                  ...styles.pageButton,
                  ...(currentPage === totalPages && styles.disabledButton),
                }}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const styles = {
  page: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "24px",
    minHeight: "calc(100vh - 70px)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "10px",
  },

  headerInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "5px",
  },

  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#1f2937",
    margin: 0,
  },

  count: {
    fontSize: "14px",
    color: "#6b7280",
    backgroundColor: "#f3f4f6",
    padding: "6px 12px",
    borderRadius: "20px",
    margin: 0,
  },

  pageInfo: {
    fontSize: "12px",
    color: "#9ca3af",
    margin: 0,
  },

  message: {
    textAlign: "center",
    color: "#6b7280",
    padding: "40px 0",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 2px 5px rgba(0,0,0,0.04)",
    transition: "0.2s",
  },

  bookTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#2563eb",
    margin: "0 0 12px 0",
  },

  isbn: {
    fontFamily: "monospace",
    fontSize: "13px",
    backgroundColor: "#f3f4f6",
    padding: "2px 6px",
    borderRadius: "4px",
  },

  category: {
    backgroundColor: "#e0e7ff",
    color: "#3730a3",
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "13px",
  },

  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    marginTop: "40px",
    padding: "20px 0",
  },

  pageButton: {
    padding: "8px 16px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "0.2s",
    "&:hover:not(:disabled)": {
      backgroundColor: "#1d4ed8",
    },
  },

  disabledButton: {
    backgroundColor: "#93c5fd",
    cursor: "not-allowed",
    opacity: 0.6,
  },

  pageNumbers: {
    display: "flex",
    gap: "8px",
  },

  pageNumber: {
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
    color: "#374151",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "0.2s",
    "&:hover": {
      backgroundColor: "#e5e7eb",
    },
  },

  activePage: {
    backgroundColor: "#2563eb",
    color: "white",
    borderColor: "#2563eb",
  },
};
