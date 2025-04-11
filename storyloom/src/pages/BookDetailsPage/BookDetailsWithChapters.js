import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

function BookDetailWithChapters() {
  const { id: bookId } = useParams();
  const [book, setBook] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:5000/api/books/${bookId}`)
      .then(res => res.json())
      .then(data => setBook(data));
  }, [bookId]);

  if (!book || !Array.isArray(book.chapters)) {
    return <p>⏳ Loading book or chapters...</p>;
  }
  
  // Get chapters sorted
  const sortedChapters = Array.isArray(book.chapters)
  ? [...book.chapters].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    })
  : [];


  const chaptersPerPage = 10;
  const paginated = sortedChapters.slice((currentPage - 1) * chaptersPerPage, currentPage * chaptersPerPage);

  return (
    <div className="container">
      <h2>{book.title}</h2>
      <p>{book.description}</p>

      {/* Settings option to edit the book details */}
      <Link to={`/edit-story/${bookId}`}>
        <Button variant="primary">Edit Book</Button>
      </Link>

      <div className="d-flex justify-content-between mb-3">
        <Link to={`/books/${bookId}/create-chapter`}>
          <Button variant="success">➕ Create New Chapter</Button>
        </Link>
        <Button onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}>
          Sort: {sortOrder === 'asc' ? 'Oldest First' : 'Newest First'}
        </Button>
      </div>

      {paginated.map(chapter => (
        <Card key={chapter._id} className="mb-2">
          <Card.Body>
            <Card.Title>{chapter.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {/* Last created or updated date with the pusblish stauts of the chapter */}
              {/* TIme - date format */}
              {new Date(chapter.createdAt).toLocaleDateString()} - {chapter.published ? 'Published' : 'Draft'}
            </Card.Subtitle>
            <Link to={`/edit-chapter/${chapter._id}`}>
              <Button variant="primary">Edit</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}

      <div className="d-flex justify-content-between mt-4">
        <Button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>← Prev</Button>
        <Button disabled={currentPage * chaptersPerPage >= book.chapters.length} onClick={() => setCurrentPage(p => p + 1)}>Next →</Button>
      </div>
    </div>
  );
}

export default BookDetailWithChapters;
