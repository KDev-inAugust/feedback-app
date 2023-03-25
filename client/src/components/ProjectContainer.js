import React from "react";
import { Link, Outlet } from "react-router-dom";


function ProjectContainer ({user, userProjectsArray}){
   return(
    <div>
   <h1>Projects</h1>
   
   {user? userProjectsArray.map(index=>{
    return(
         <Link key={index.id} to={`/Project/${index.id}`} className="project-link">{index.name}</Link>
    )
   }) : "loading projects"}
   
   
   </div>
   ) 
}

export default ProjectContainer;