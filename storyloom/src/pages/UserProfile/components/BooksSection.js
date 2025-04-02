import React from "react";
import "../../../styles/UserProfile.css";

const BooksSection = ({ books }) => {
  return (
    <div className="books-section">
      {books.length > 0 ? (
        books.map((book, index) => (
          <div key={index} className="book-item">
            <img src={book.cover} alt={book.title} className="book-cover" />
            <p>{book.title}</p>
          </div>
        ))
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
};

export default BooksSection;
