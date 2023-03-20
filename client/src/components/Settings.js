import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";


function Settings ({user, deleteProject, addProject}){

    const [newProjectName, setNewProjectName] = useState("");

    function handleAddProject(e){
        e.preventDefault();
        addProject(newProjectName);
    }

    function handleProjectName(e){
        console.log(e.target.value);
        setNewProjectName(e.target.value)
    }

    return(
        <div>
            <h1>Settings</h1>
            <h2>Project List</h2>
            {user? user.projects.map(index=>{
            return(
                <div>
                    <Link to={`/projects/${index.id}`}>{index.name}</Link>
                    <button onClick={deleteProject} value={index.id}>delete project</button>
                </div>
            )
        }) : "loading projects"}

            <h2>Create Project</h2>
            <form id="add-project" onSubmit={handleAddProject}>
                <input type='text' onChange={handleProjectName}/>
            </form>
            <button type="submit" form="add-project">add project</button>
            </div>
    )
}

export default Settings;