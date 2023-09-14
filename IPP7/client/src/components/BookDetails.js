import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getBookQuery, removeBookMutation, getBooksQuery } from '../queries/queries';

function BookDetails(props) {
    const { loading, error, data } = useQuery(getBookQuery, {
        variables: { id: props.bookId }
    });

    const [removeBook] = useMutation(removeBookMutation);

    function handleRemoveBook() {
        removeBook({
            variables: { id: props.bookId },
            refetchQueries: [{ query: getBookQuery, variables: { id: props.bookId } },
                { query: getBooksQuery }]
        })
            .then(() => {

            })
            .catch(error => {

            });
    }

    function displayBookDetails() {
        const book = data.book;
        if (book) {
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this author:</p>
                    <ul className="other-books">
                        {book.author.books.map(item => {
                            return <li key={item.id}>{item.name}</li>;
                        })}
                    </ul>
                    <button onClick={handleRemoveBook}>Remove Book</button>
                </div>
            );
        } else {
            return <div>No book selected...</div>;
        }
    }

    return (
        <div id="book-details">
            {loading ? <div>Loading book details...</div> : displayBookDetails()}
            {error && <div>Error: {error.message}</div>}
        </div>
    );
}

export default BookDetails;