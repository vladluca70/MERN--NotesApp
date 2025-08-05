

function WelcomePage({username, logout})
{
    return(
        <>
        <p>Welcome {username}</p> <br/>
        <button onClick={logout}>Log out</button>
        </>
    )
}

export default WelcomePage;