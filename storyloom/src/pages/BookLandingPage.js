import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const BookLandingPage = () => {
    const { id } = useParams();  // Get book ID from URL params
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/books/${id}`)
            .then(res => res.json())
            .then(data => setBook(data))
            .catch(err => console.error('Error fetching book:', err));
    }, [id]);

    if (!book) return <div>Loading book...</div>;

    // Get the first chapter ID for navigation
    const firstChapterId = book.chapters[0]._id; 
    console.log('First Chapter ID:', firstChapterId);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-gray-600 mb-4">{book.description}</p>
            <p className="italic mb-2">Author: {book.authorName}</p>
            {/* Placeholder stats for now */}
            <div className="mb-4">
                <p>Votes: Coming soon</p>
                <p>Reviews: Coming soon</p>
                <p>Ranking: TBD</p>
            </div>

            {/* Navigate to the first chapter using its ID */}
            <Link to={`/read/${book._id}/${firstChapterId}`}>
                <Button>📖 Read Now</Button>
            </Link>
        </div>
    );
};

export default BookLandingPage;
