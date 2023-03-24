import React from "react";
import { Link, Outlet } from "react-router-dom";


function ProjectContainer ({user}){
   return(
    <div>
   <h1>Projects</h1>
   
   {user? user.projects.map(index=>{
    return(<Link to={`/Project/${index.id}`}>{index.name}</Link>)
   }) : "loading projects"}
   
   
   </div>
   ) 
}

export default ProjectContainer;