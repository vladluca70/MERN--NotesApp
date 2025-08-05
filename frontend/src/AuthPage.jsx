import { useState } from "react";


function AuthPage()
{
    const [username, setUsername]=useState('')
    const [errorMessage, setErrorMessage]=useState('')

    function handleChangeName(e){
        setUsername(e.target.value)
    }

    async function handleLoginButton(){
        await handleRequest('login')
    }

    async function handleRequest(requestType)
    {
        const url=`http://localhost:5000/${requestType}`

        try {
            const response = await fetch(url, {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({name:username})
            });

            
        } 
        catch (error) {

            console.error("errors", error)
        }
    }

    return(
        <>
            <input onChange={(e)=>handleChangeName(e)}/>
            <button onClick={handleLoginButton}>Log in</button>
        </>
    )
}

export default AuthPage;