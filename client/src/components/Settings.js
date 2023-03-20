import React from "react";
import { Link } from "react-router-dom";


function Settings ({user, deleteProject}){

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
            </div>
    )
}

export default Settings;