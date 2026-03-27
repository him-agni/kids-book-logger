import React, { useState, useEffect } from "react";
import axios from "axios";

const BookSearch = ({ userId }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [ageFilter, setAgeFilter] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim().length > 2) searchBooks(query);
      else setResults([]);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [query, ageFilter]);

  const searchBooks = async (q) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://kids-book-logger.vercel.app/api/books/search?query=${q}&age=${ageFilter}`,
      );
      setResults(data.books || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const logBook = async (book, status) => {
    try {
      await axios.post("https://kids-book-logger.vercel.app/api/logs", {
        userId,
        bookDetails: {
          title: book.title,
          author: book.author,
          coverUrl: book.coverUrl,
        },
        status,
      });
      alert("Book added to library! 🎉");
    } catch (err) {
      alert("Failed to log book. Is the backend running?");
    }
  };

  return (
    <div className="card animate-pop" style={{ position: "relative" }}>
      <h2>Discover New Books! 🔍</h2>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        <input
          className="input-field"
          type="text"
          placeholder="Start typing a book title or topic..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flexGrow: 1 }}
        />
        <div style={{ minWidth: "150px" }}>
          <label
            style={{
              display: "block",
              fontSize: "1rem",
              fontWeight: "bold",
              marginBottom: "0.3rem",
            }}
          >
            Age Filter: {ageFilter} yrs
          </label>
          <input
            type="range"
            min="0"
            max="15"
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
      </div>

      {loading && (
        <p style={{ fontWeight: "bold", color: "var(--primary)" }}>
          Searching magically... ✨
        </p>
      )}

      {results.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1.5rem",
            marginTop: "1.5rem",
          }}
        >
          {results.map((book) => (
            <div
              key={book.googleBooksId}
              className="card"
              style={{
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "none",
                border: "2px solid #E1E8EE",
              }}
            >
              <div>
                {book.coverUrl && (
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      marginBottom: "1rem",
                    }}
                  />
                )}
                <h4 style={{ margin: "0.5rem 0", lineHeight: "1.3" }}>
                  {book.title}
                </h4>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#666",
                    fontWeight: "600",
                  }}
                >
                  {book.author}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  marginTop: "1rem",
                  flexDirection: "column",
                }}
              >
                <button
                  className="btn"
                  style={{ padding: "8px 16px", fontSize: "0.9rem" }}
                  onClick={() => logBook(book, "reading")}
                >
                  📖 Reading List
                </button>
                <button
                  className="btn btn-secondary"
                  style={{ padding: "8px 16px", fontSize: "0.9rem" }}
                  onClick={() => logBook(book, "completed")}
                >
                  ✅ Completed
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default BookSearch;
