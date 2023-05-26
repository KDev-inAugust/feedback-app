import '../App.css';

import { useEffect, useState} from 'react';
import { createContext } from 'react';
import Dashboard from './Dashboard';
import LogIn from './Login';
import SignUp from './Signup';
export const UserContext = createContext(null);


function App() {
  const [user, setUser] = useState(null);
  // error handling for log-in and sign-up
  const [error, setError] =  useState(null);
  const [userProjectsArray, setUserProjectsArray] = useState([])
  const [userClientProjectArray, setUserClientProjectArray] = useState([])
  // error handling passed down to settings
  const [errors, setErrors] = useState(null)
  

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
    r.json().then((data) => {setError(data.error); console.log(error)})
    })
}

// --------------- LOG OUT function ---------
function handleLogout(){
  fetch("/logout", {
    method: "DELETE",
  }).then(()=> {setUser(null); setError(null); setErrors(null)})
}

// --------------- add Client to Project -----------------------
function AddClientProject(projectID, userID){

  fetch('/client_projects',{
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          project_id: projectID ,
          user_id: parseInt(userID)
      })
  }).then((r)=>{
      if(r.ok) {
          r.json().then(
            (project)=>{setUserProjectsArray(
              userProjectsArray.map((index)=>{
                  if (index.id===project.id){
                    return project
                  }
                  else return index
              })); setErrors(null)
            }
          )
      } else r.json().then((data)=>setErrors(data.error));
  }) }

// ----------------- Remove client from project ------------

  function removeClientProject(id){
    fetch(`/client_projects/${id}`, {
      method: "DELETE",
    }).then(r=>r.json()).then((project)=>{
      setUserProjectsArray(userProjectsArray.map((index)=>{
        if (index.id===project.id)
        {return project} 
        else return index
      }))
    })
  }



// ------------ ADD PROJECT function -----------
  function addProject(name){

    fetch("/projects",{
      method: "POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        user_id: user.id,
        name: name
    })
    }).then((r)=>{
      if (r.ok){
        r.json().then((project)=>{setUserProjectsArray([...userProjectsArray, project]);
        setErrors(null)
        })
      }
      else r.json().then(data=>setErrors(data.errors))
      }
      
      )

  }
// ---------DELETE PROJECT function --------
  function deleteProject(e){
    if(window.confirm("delete this project and all feedback? this cannot be undone.") === true){
      fetch (`/projects/${e.target.value}`,{
        method: "DELETE",
      }).then(r=>r.json()).then((project)=>{
        let newProjectArray=userProjectsArray.filter((index)=>{return index.id!==project.id})
        setUserProjectsArray(newProjectArray)
      }) 
    }
  }

// ---------- the RETURN -----------
   if(user!==null)  { 
  return(
    <div className='App'>
      <header id="App-header">
          <h1>The Feedback App</h1>
          <h2>{`hello "${user.name}"`}</h2>
      </header>
      
      <UserContext.Provider value={user}>
          <Dashboard 
          handleLogout={handleLogout}
          userProjectsArray={userProjectsArray} 
          userClientProjectArray={userClientProjectArray}
          deleteProject={deleteProject} 
          addProject={addProject}
          AddClientProject={AddClientProject}
          removeClientProject={removeClientProject}
          errors={errors}
          />
      </UserContext.Provider>
    </div>
  )
     }
     else return (
      <div className='App'>
        <header id="login-header">
          <h1>The Feedback App Log In</h1>
        </header>

        <div id="log-in">
          <h2>Log In</h2>
          <LogIn onLogin={handleLogin} />
         { error? <p className="error-message">{error}</p> : null }
        </div>
          <div id="sign-up"> 
            <h2>Sign Up</h2>
            <SignUp onLogin={handleLogin}/>
          </div>

      </div>
     )
}

export default App;
