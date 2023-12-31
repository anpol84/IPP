import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

function AddBook() {
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');

    const { loading, error, data } = useQuery(getAuthorsQuery);
    const [addBook] = useMutation(addBookMutation);

    function displayAuthors() {
        if (loading) {
            return <option disabled>Loading authors</option>;
        } else {
            return data.authors.map(author => (
                <option key={author.id} value={author.id}>{author.name}</option>
            ));
        }
    }

    function submitForm(e) {
        e.preventDefault();
        addBook({
            variables: { name: name, genre: genre, authorId: authorId },
            refetchQueries: [{ query: getBooksQuery }]
        });
        setName('');
        setGenre('');
        setAuthorId('');
    }

    return (
        <form id="add-book" onSubmit={submitForm}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
            </div>
            <div className="field">
                <label>Author:</label>
                <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
                    <option>Select author</option>
                    {displayAuthors()}
                </select>
            </div>
            <button>+</button>
        </form>
    );
}

export default AddBook;
