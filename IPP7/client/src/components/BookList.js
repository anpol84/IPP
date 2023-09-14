import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';

// components
import BookDetails from './BookDetails';

function BookList() {
    const [selected, setSelected] = useState(null);
    const { loading, error, data } = useQuery(getBooksQuery);

    function displayBooks() {
        if (loading) {
            return <div>Loading books...</div>;
        } else {
            return data.books.map(book => {
                return (
                    <li key={book.id} onClick={() => setSelected(book.id)}>
                        {book.name}
                    </li>
                );
            });
        }
    }

    return (
        <div>
            <ul id="book-list">{displayBooks()}</ul>
            <BookDetails bookId={selected} />
            {error && <div>Error: {error.message}</div>}
        </div>
    );
}

export default BookList;