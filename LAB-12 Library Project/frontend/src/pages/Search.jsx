import { useState, useEffect, useRef } from "react";
import axios from "axios";

const API = "https://6881dcdf66a7eb81224c58b1.mockapi.io/Books";

export default function Search() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allBooks, setAllBooks] = useState([]);
  const searchRef = useRef(null);

  // Load all books on component mount
  useEffect(() => {
    axios
      .get(API)
      .then((res) => {
        setAllBooks(res.data || []);
      })
      .catch(() => {
        console.log("Failed to load books");
      });
  }, []);

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Generate suggestions based on query
  useEffect(() => {
    if (query.trim().length > 0) {
      const searchTerm = query.toLowerCase();
      const matchedBooks = allBooks
        .filter((book) => {
          return (
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.isbn.includes(searchTerm) ||
            (book.category && book.category.toLowerCase().includes(searchTerm))
          );
        })
        .slice(0, 5); // Show max 5 suggestions

      setSuggestions(matchedBooks);
      setShowSuggestions(matchedBooks.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, allBooks]);

  const handleSearch = async () => {
    if (!query.trim()) {
      return;
    }

    setLoading(true);
    setShowSuggestions(false);

    try {
      const searchTerm = query.toLowerCase();
      const matchedBooks = allBooks.filter((book) => {
        return (
          book.title.toLowerCase().includes(searchTerm) ||
          book.author.toLowerCase().includes(searchTerm) ||
          book.isbn.includes(searchTerm) ||
          (book.category && book.category.toLowerCase().includes(searchTerm))
        );
      });

      setBooks(matchedBooks);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = (book) => {
    setQuery(book.title);
    setShowSuggestions(false);
    setBooks([book]);
  };

  const clearSearch = () => {
    setQuery("");
    setBooks([]);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Search Books</h2>
        <p style={styles.subtitle}>
          Search by title, author, ISBN, or category
        </p>
      </div>

      <div style={styles.searchContainer} ref={searchRef}>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Type to search books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => query.length > 0 && setShowSuggestions(true)}
            style={styles.input}
            disabled={loading}
          />
          {query && (
            <button onClick={clearSearch} style={styles.clearButton}>
              ✕
            </button>
          )}
          <button
            onClick={handleSearch}
            style={styles.searchButton}
            disabled={loading || !query.trim()}
          >
            {loading ? "..." : "Search"}
          </button>
        </div>

        {/* Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div style={styles.suggestions}>
            <div style={styles.suggestionHeader}>
              <span style={styles.suggestionTitle}>Suggestions</span>
              <span style={styles.suggestionCount}>
                {suggestions.length} found
              </span>
            </div>
            {suggestions.map((book) => (
              <div
                key={book.id}
                style={styles.suggestionItem}
                onClick={() => handleSuggestionClick(book)}
              >
                <div style={styles.suggestionBookTitle}>{book.title}</div>
                <div style={styles.suggestionBookInfo}>
                  <span style={styles.suggestionAuthor}>{book.author}</span>
                  <span style={styles.suggestionIsbn}>{book.isbn}</span>
                  {book.category && (
                    <span style={styles.suggestionCategory}>
                      {book.category}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search Results */}
      {books.length > 0 ? (
        <div style={styles.results}>
          <div style={styles.resultsHeader}>
            <h3 style={styles.resultsTitle}>
              Found {books.length} {books.length === 1 ? "book" : "books"}
            </h3>
            <button onClick={clearSearch} style={styles.clearResults}>
              Clear Results
            </button>
          </div>
          <div style={styles.booksGrid}>
            {books.map((book) => (
              <div key={book.id} style={styles.card}>
                <h4 style={styles.bookTitle}>{book.title}</h4>
                <p style={styles.bookInfo}>
                  <b>Author:</b> {book.author}
                </p>
                <p style={styles.bookInfo}>
                  <b>ISBN:</b> <span style={styles.isbn}>{book.isbn}</span>
                </p>
                {book.category && (
                  <p style={styles.bookInfo}>
                    <b>Category:</b>{" "}
                    <span style={styles.category}>{book.category}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : query && !loading ? (
        <p style={styles.info}>No results found for "{query}"</p>
      ) : (
        <p style={styles.info}>Start typing to search for books...</p>
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

  searchContainer: {
    position: "relative",
    marginBottom: "30px",
  },

  searchBox: {
    display: "flex",
    gap: "10px",
    position: "relative",
  },

  input: {
    flex: 1,
    padding: "12px 16px",
    fontSize: "16px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    outline: "none",
    transition: "all 0.2s",
    "&:focus": {
      borderColor: "#2563eb",
      boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)",
    },
  },

  clearButton: {
    position: "absolute",
    right: "110px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "#9ca3af",
    cursor: "pointer",
    fontSize: "16px",
    padding: "0 8px",
    "&:hover": {
      color: "#6b7280",
    },
  },

  searchButton: {
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    minWidth: "100px",
    transition: "all 0.2s",
    "&:hover:not(:disabled)": {
      backgroundColor: "#1d4ed8",
    },
    "&:disabled": {
      backgroundColor: "#93c5fd",
      cursor: "not-allowed",
    },
  },

  suggestions: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    zIndex: 100,
    marginTop: "4px",
    maxHeight: "300px",
    overflowY: "auto",
  },

  suggestionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 16px",
    backgroundColor: "#f9fafb",
    borderBottom: "1px solid #e5e7eb",
  },

  suggestionTitle: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#6b7280",
    textTransform: "uppercase",
  },

  suggestionCount: {
    fontSize: "12px",
    color: "#9ca3af",
    backgroundColor: "#e5e7eb",
    padding: "2px 8px",
    borderRadius: "10px",
  },

  suggestionItem: {
    padding: "12px 16px",
    borderBottom: "1px solid #f3f4f6",
    cursor: "pointer",
    transition: "all 0.2s",
    "&:hover": {
      backgroundColor: "#f9fafb",
    },
    "&:last-child": {
      borderBottom: "none",
    },
  },

  suggestionBookTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "4px",
  },

  suggestionBookInfo: {
    display: "flex",
    gap: "12px",
    fontSize: "12px",
    color: "#6b7280",
    flexWrap: "wrap",
  },

  suggestionAuthor: {
    color: "#4b5563",
  },

  suggestionIsbn: {
    fontFamily: "monospace",
    backgroundColor: "#f3f4f6",
    padding: "1px 4px",
    borderRadius: "3px",
  },

  suggestionCategory: {
    backgroundColor: "#e0e7ff",
    color: "#3730a3",
    padding: "1px 6px",
    borderRadius: "4px",
  },

  results: {
    marginTop: "20px",
  },

  resultsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  resultsTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#374151",
    margin: 0,
  },

  clearResults: {
    padding: "8px 16px",
    fontSize: "14px",
    backgroundColor: "#f3f4f6",
    color: "#6b7280",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s",
    "&:hover": {
      backgroundColor: "#e5e7eb",
    },
  },

  booksGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },

  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 2px 5px rgba(0,0,0,0.04)",
  },

  bookTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#2563eb",
    margin: "0 0 12px 0",
  },

  bookInfo: {
    fontSize: "14px",
    color: "#374151",
    margin: "6px 0",
  },

  isbn: {
    fontFamily: "monospace",
    backgroundColor: "#f3f4f6",
    padding: "2px 6px",
    borderRadius: "4px",
    fontSize: "13px",
  },

  category: {
    backgroundColor: "#e0e7ff",
    color: "#3730a3",
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "13px",
  },

  info: {
    textAlign: "center",
    color: "#6b7280",
    padding: "40px 0",
    fontSize: "16px",
  },
};
