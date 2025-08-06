import { useEffect, useState } from "react";

function Notes({ usernameForNotes }) {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function handleNewNoteChange(e) {
        setNewNote(e.target.value);
    }

    async function handleAddButton() {
        await handleRequest('add-new-note');
    }

    async function handleRequest(requestType) {
        const url = `http://localhost:5000/${requestType}`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: usernameForNotes, newNote: newNote })
            });

            const responseData = await response.json();

            if (response.ok) {
                setNotes(prevNotes => [...prevNotes, responseData.note]);
                setNewNote('');
                setErrorMessage('');
            } else {
                setErrorMessage(responseData.message);
            }

        } catch (error) {
            console.error("errors", error);
            setErrorMessage("An error occurred while adding the note.");
        }
    }

    useEffect(() => {
        async function fetchNotes() {
            if (!usernameForNotes) return;

            try {
                const url = 'http://localhost:5000/fetch-notes';
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: usernameForNotes })
                });

                const data = await response.json();

                if (response.ok) {
                    setNotes(data.notes);
                    setErrorMessage('');
                } else {
                    setErrorMessage(data.message);
                }

            } catch (error) {
                console.error("errors", error);
                setErrorMessage("An error occurred while fetching notes.");
            }
        }

        fetchNotes();
    }, [usernameForNotes]);

    async function handleDelete(id) {
        const url = 'http://localhost:5000/delete-note';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });

            const responseData = await response.json();
            if (response.ok) {
                setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
            } else {
                setErrorMessage(responseData.message);
            }

        } catch (error) {
            console.error("errors", error);
            setErrorMessage("An error occurred while deleting the note.");
        }
    }

    return (
        <>
            <ul>
                {notes.map((note) => (
                    <li key={note._id}>
                        {note.note}
                        <button onClick={() => handleDelete(note._id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <input
                placeholder="Write here your new note"
                value={newNote}
                onChange={handleNewNoteChange}
            />
            {errorMessage && <p>{errorMessage}</p>}
            <button onClick={handleAddButton}>Add new note</button>
        </>
    );
}

export default Notes;
