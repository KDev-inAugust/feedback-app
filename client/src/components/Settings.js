import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";


function Settings ({user, userProjectsArray, deleteProject, addProject}){

    const [newProjectName, setNewProjectName] = useState("");

    function handleAddProject(e){
        e.preventDefault();
        addProject(newProjectName);
    }

    function handleProjectName(e){
        setNewProjectName(e.target.value)
    }

    return(
        <div>
            <h1>Settings</h1>
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
        </div>
    )
}

export default Settings;