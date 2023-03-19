import '../App.css';

import { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import LogIn from './Login';



function App() {
  const [user, setUser] = useState(null);
  const [error, setError] =  useState([]);
  // this "/me" checks the user against an active sessions user_id so if there is no active sesssion it will throw an error


  useEffect(()=>{
    fetch("/me")
    .then((r)=> {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    })
  },[])


  function handleLogin(){
  fetch("/me")
  .then((r)=> {
    if (r.ok) {
      r.json().then((user) => {setUser(user); console.log(user)})
    }
    else
    r.json().then((data) => setError(data.error))
    })

}

  function handleLogout(){
    fetch("/logout", {
      method: "DELETE",
    }).then(()=> setUser(null))
  }


   if(user!==null)  { 
  return(
    <div className='App'>
      <header className="App-header">
          <h1>The Feedback App</h1>
          <button onClick={handleLogout}>Logout</button>
      </header>
      <h2>{`hello "${user.name}"`}</h2>
      <Dashboard user={user}/>
    </div>
  )
     }
     else return (
      <div className='App'>
        <header className="App-header">
          <h1>The Feedback App Log In</h1>
      </header>
        <LogIn onLogin={handleLogin} />
      </div>
      
     )
}

export default App;
