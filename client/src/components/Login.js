import React, { useState } from "react";

function LogIn({onLogin}){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
        .then((r)=> r.json())
        .then((user) => {onLogin(user); console.log(user)})
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            />
            <br></br>
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">submit</button>
        </form>
    )
}

export default LogIn;