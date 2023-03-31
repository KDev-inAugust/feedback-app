import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";


function Settings ({user, userProjectsArray, deleteProject, addProject}){

    const [newProjectName, setNewProjectName] = useState("");
    const [selectedClientProject, setSelectedClientProject] = useState("");
    const [selectedClientID, setSelecteClientID] = useState(0)

    // ----------- add a project to the client account ------------
    function handleAddProject(e){
        e.preventDefault();
        addProject(newProjectName);
    }

    function handleProjectName(e){
        setNewProjectName(e.target.value)
    }

    // -------------- add a client to the project --------------

    function handleSelectProject(e){
        console.log(e.target.value);
        setSelectedClientProject(e.target.value);
    }

    function handleSelectUser(e){
        console.log(e.target.value);
        setSelecteClientID(e.target.value);
    }

    function handleAddClientProject(){
        AddClientProject(selectedClientProject, selectedClientID)
    }

    function AddClientProject(projectID, userID){
        console.log("add client project triggered");

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
                r.json().then(clientProject=>console.log(clientProject))
            }
            else
            r.json().then((data)=>console.log(data))
            
        })}

    return(
        <div>
            <h1>Settings</h1>
            <h2>Your User ID is: {user.id}</h2>
            <h2>Project List</h2>
            {user? userProjectsArray.map(index=>{
            return(
                <div key={index.id}>
                    <Link to={`/Project/${index.id}`} className="project-link">{index.name}</Link>
                    <button onClick={deleteProject} value={index.id}>delete project</button>
                </div>
            )
        }) : "loading projects"}

            <h2>Create Project</h2>
            <form id="add-project" onSubmit={handleAddProject}>
                <input type='text' onChange={handleProjectName}/>
            </form>
            <button type="submit" form="add-project">add project</button>
            <h2>Add A Client To A Project</h2>
            <form id="add-client" >
                <h3>Select Project</h3>
                <select id="project-select" onChange={handleSelectProject}> 
                    <option>choose a project</option>
                    {userProjectsArray.map((project)=>
                    <option value={project.id}>{project.name}</option>
                    )}
                </select>
                <h3>input User by ID</h3>
                <input type="integer" onChange={handleSelectUser}/>
            </form>
            <button onClick={handleAddClientProject}>add client</button>
        </div>
    )
}

export default Settings;