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


  // --------LOG IN function ---------
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

// --------LOG OUT function ---------
  function handleLogout(){
    fetch("/logout", {
      method: "DELETE",
    }).then(()=> setUser(null))
  }
// ---------DELETE PROJECT function --------
  function deleteProject(e){
    console.log(`delete project triggered on ${e.target.value}`);

    fetch (`/projects/${e.target.value}`,{
      method: "DELETE",
    }).then(r=>r.json()).then(data=>console.log(data))
  }

// ----------the RETURN -----------
   if(user!==null)  { 
  return(
    <div className='App'>
      <header className="App-header">
          <h1>The Feedback App</h1>
          <button onClick={handleLogout}>Logout</button>
      </header>
      <h2>{`hello "${user.name}"`}</h2>
      <Dashboard user={user} deleteProject={deleteProject}/>
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
