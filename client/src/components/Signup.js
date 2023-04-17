import React from "react";
import { useState } from "react";


function SignUp({onLogin}){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [signupError, setSignupError] = useState(null)

function handleSubmit(e){
    e.preventDefault();
    fetch ("/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
           name: username,
           password,
           password_confirmation: passwordConfirmation
        }),
    })
    .then((r) => {
        if (r.ok) {
        r.json().then((user) => onLogin(user))
        }
        else
        r.json().then((error) => setSignupError(error.errors[0]) )
    })
}



return(
    <div>
    <form onSubmit={handleSubmit}>
        <h3 htmlFor="username">Username </h3>
        <input
        type="text"
        id="username"
        value={username}
        onChange={(e)=> setUsername(e.target.value)}
        />
        <h3 htmlFor="password">Password </h3>
        <input
        type="password"
        id="password"
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        />
        <h3 htmlFor="password_confirmation">Confirm Password </h3>
        <input
        type="password"
        id="password_confirmation"
        value={passwordConfirmation}
        onChange={(e)=> {setPasswordConfirmation(e.target.value)}}
        />
        <button type="submit">submit</button>
    </form>
    { signupError? <p className="error-message">{signupError}</p> : null }
    </div>
    );
}

export default SignUp;