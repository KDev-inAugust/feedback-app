import '../App.css';

import { useEffect, useState} from 'react';
import { createContext } from 'react';
import Dashboard from './Dashboard';
import LogIn from './Login';
import SignUp from './Signup';
export const UserContext = createContext(null);


function App() {
  const [user, setUser] = useState(null);
  const [error, setError] =  useState(null);
  const [userProjectsArray, setUserProjectsArray] = useState([])
  const [userClientProjectArray, setUserClientProjectArray] = useState([])
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
    console.log(id);
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

// --------------- LOG OUT function ---------
  function handleLogout(){
    fetch("/logout", {
      method: "DELETE",
    }).then(()=> {setUser(null); setError(null); setErrors(null)})
  }

// ------------ ADD PROJECT function -----------
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
    console.log(`delete project triggered on ${e.target.value}`);
    if(window.confirm("delete this project and all feedback? this cannot be undone.") === true){
      fetch (`/projects/${e.target.value}`,{
        method: "DELETE",
      }).then(r=>r.json()).then((project)=>{
        let newProjectArray=userProjectsArray.filter((index)=>{return index.id!==project.id})
        setUserProjectsArray(newProjectArray)
      }) 
    }
   
  }

// ----------the RETURN -----------
   if(user!==null)  { 
  return(
   
    <div className='App'>
      <header className="App-header">
          <h1>The Feedback App</h1>
      </header>
      <h2>{`hello "${user.name}"`}</h2>
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
        <header className="App-header">
          <h1>The Feedback App</h1>
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
