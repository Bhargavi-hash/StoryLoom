import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ChapterReader() {
  const { bookId, chapterId } = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(null);
  const [book, setBook] = useState(null);

  useEffect(() => {

    console.log('BookId:', bookId);
    console.log('ChapterId:', chapterId);

    // Fetch the book along with all its chapters (drafts and published)
    const fetchBook = async () => {
      const res = await fetch(`http://localhost:5000/api/books/${bookId}`);
      const data = await res.json();
      setBook(data);
    };

    const fetchChapter = async () => {
      const res = await fetch(`http://localhost:5000/api/chapters/${chapterId}`);
      const data = await res.json();
      setChapter(data);
    };

    fetchBook();
    fetchChapter();
  }, [bookId, chapterId]);

  const goToNext = () => {
    if (book && book.chapters) {
      // Filter out the chapters that are published
      const publishedChapters = book.chapters.filter(ch => ch.published);
      const index = publishedChapters.findIndex(ch => ch._id === chapterId);
      
      if (index !== -1 && index + 1 < publishedChapters.length) {
        navigate(`/read/${bookId}/${publishedChapters[index + 1]._id}`);
      }
    }
  };

  if (!chapter || !book || !book.chapters) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>{chapter.title}</h2>
      <hr />
      <p style={{ whiteSpace: 'pre-wrap' }}>{chapter.content}</p>

      {/* Next Chapter Button */}
      {(() => {
        if (book && book.chapters) {
          // Filter out the chapters that are published
          const publishedChapters = book.chapters.filter(ch => ch.published);
          const currentIndex = publishedChapters.findIndex(ch => ch._id === chapterId);
          return currentIndex !== -1 && currentIndex < publishedChapters.length - 1 ? (
            <button onClick={goToNext} className="btn btn-primary mt-4">
              ➡️ Next Chapter
            </button>
          ) : (
            <p className="mt-4 text-muted">You've reached the end!</p>
          );
        }
      })()}
    </div>
  );
}

export default ChapterReader;

