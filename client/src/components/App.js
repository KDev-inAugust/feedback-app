import '../App.css';

import { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import LogIn from './Login';



function App() {
  const [user, setUser] = useState(null);
  const [error, setError] =  useState([]);
  const [userProjectsArray, setUserProjectsArray] = useState([])
  const [userClientProjectArray, setUserClientProjectArray] = useState([])
  // this "/me" checks the user against an active sessions user_id so if there is no active sesssion it will throw an error

// ----------this "ME" effect checks the "ME" anytime this page reloads------
  useEffect(()=>{
    fetch("/me")
    .then((r)=> {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          setUserProjectsArray(user.projects);
          setUserClientProjectArray(user.client_projects);
        });
      }
    })
  },[])


  // --------LOG IN function ---------
  function handleLogin(){
  fetch("/me")
  .then((r)=> {
    if (r.ok) {
      r.json().then((user) => {setUser(user); 
        setUserProjectsArray(user.projects);
        setUserClientProjectArray(user.client_projects);

      })
    }
    else
    r.json().then((data) => setError(data.error))
    })
    
}

// --------LOG OUT function ---------
  function handleLogout(){
    fetch("/logout", {
      method: "DELETE",
    }).then(()=> {setUser(null)})
  }

// ------------ADD PROJECT function -----------
  function addProject(name){
    console.log(`add project triggered with name ${name} and user id ${user.id}`);

    fetch("/projects",{
      method: "POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        user_id: user.id,
        name: name
    })
    }).then(r=>r.json()).then((project)=>setUserProjectsArray([...userProjectsArray, project]))

  }
// ---------DELETE PROJECT function --------
  function deleteProject(e){
    console.log(`delete project triggered on ${e.target.value}`);

    fetch (`/projects/${e.target.value}`,{
      method: "DELETE",
    }).then(r=>r.json()).then((project)=>{
      let newProjectArray=userProjectsArray.filter((index)=>{return index.id!==project.id})
      setUserProjectsArray(newProjectArray)
    })
      
      
  }

// ----------the RETURN -----------
   if(user!==null)  { 
  return(
    <div className='App'>
      <header className="App-header">
          <h1>The Feedback App</h1>
      </header>
      <h2>{`hello "${user.name}"`}</h2>
      <Dashboard 
      user={user} 
      handleLogout={handleLogout}
      userProjectsArray={userProjectsArray} 
      userClientProjectArray={userClientProjectArray}
      deleteProject={deleteProject} 
      addProject={addProject}/>
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
