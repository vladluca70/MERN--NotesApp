import { useState } from "react"


function Notes({usernameForNotes})
{
    const [notes, setNotes]=useState([])
    const [newNote, setNewNote]=useState('')
    const [errorMessage, setErrorMessage]=useState('')

    function handlleNewNoteChange(e){
        setNewNote(e.target.value)
    }

    async function handleAddButton() {
        await handleRequest('add-new-note')
    }

    async function handleRequest(requestType) {
        
        const url=`http://localhost:5000/${requestType}`
        try {
            const response= await fetch(url, {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({username:usernameForNotes ,newNote:newNote})
            });

            const responseData=await response.json()

            if (response.ok) {
                setNotes(prevNotes => [...prevNotes, newNote]);
                setNewNote('');
                setErrorMessage('');
            }
            else{
                setErrorMessage(responseData.message)
            }

        } catch (error) {
            console.error("errors", error)
        }
    }

    return(
        <>
            <ul>
            {notes.map((note, index) => (
                <li key={index}>
                    {note}
                    <button>Delete</button>
                </li>
            ))}
            </ul>


            <input placeholder="Write here your new note" onChange={(e)=>handlleNewNoteChange(e)}/> 
            {errorMessage && <p>{errorMessage}</p>}
            <button onClick={handleAddButton}>Add new note</button>
        </>
    )
}

export default Notes