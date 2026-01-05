import React from "react";
import BookList from "./components/BookList";

export default function App() {
  return (
    <div
      style={{
        maxWidth: 800,
        margin: "2rem auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Library Management</h1>
      <BookList />
    </div>
  );
}
