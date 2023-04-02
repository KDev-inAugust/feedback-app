import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";


function Settings ({user, userProjectsArray, deleteProject, addProject, AddClientProject, removeClientProject}){

    const [newProjectName, setNewProjectName] = useState("");
    const [selectedClientProject, setSelectedClientProject] = useState("");
    const [selectedClientID, setSelecteClientID] = useState(0);


    // ----------- add a project to the User account ------------
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

    // ------------- remove client from project ----------------

    function handleRemoveClient(e){
        
        removeClientProject(e.target.value)
    }

    return(
        <div>
            <h1>Settings</h1>
            <h2>Your User ID is: {user.id}</h2>
            <h2>Project List</h2>
            {user? userProjectsArray.map((project)=>{
            return(
                <div className="settings-item" key={project.id}>
                    <Link to={`/Project/${project.id}`} className="project-link">{project.name}</Link>

                    {project.client_projects.length>0 ? 
                    project.client_projects.map( cp=>
                        <div key={cp.id}>
                            <p>{cp.user.name}</p>
                            <button value={cp.id} onClick={handleRemoveClient} className="small-button">remove client</button>
                        </div>
                        )
                    
                    : console.log("false")}

                    <br/>
                    <button onClick={deleteProject} value={project.id}>delete project</button>
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
                    <option key={project.id} value={project.id}>{project.name}</option>
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