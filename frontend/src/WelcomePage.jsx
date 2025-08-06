import Notes from "./Notes";


function WelcomePage({username, logout})
{
    return(
        <>
        <p>Welcome {username}</p> <br/>
        <Notes usernameForNotes={username} />
        <button onClick={logout}>Log out</button>
        </>
    )
}

export default WelcomePage;