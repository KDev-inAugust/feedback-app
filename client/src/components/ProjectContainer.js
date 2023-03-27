import React from "react";
import { Link} from "react-router-dom";


function ProjectContainer ({user, userProjectsArray, userClientProjectArray}){
   console.log(userClientProjectArray)

   return(
    <div>
         <h1>Admin Projects</h1>
         
         {user? userProjectsArray.map(index=>{
         return(
               <Link key={index.id} to={`/Project/${index.id}`} className="project-link">{index.name}</Link>
         )
         }) : "loading projects"}

         <h1>Client Projects</h1>
         {user? userClientProjectArray.map((index)=>{
            return(
                  <Link key={index.id} to={`/ClientProject/${index.project_id}`} className="project-link">{index.project.name}</Link>
            )
         })
         : "loading"
      }
         
         
   
   </div>
   ) 
}

export default ProjectContainer;