import React from 'react';
import {
   createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import ProjectContainer from './ProjectContainer';
import Project from './Project';
import Nav from './Nav';
import Settings from './Settings';


function Dashboard ({user, userProjectsArray, deleteProject, addProject}){

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Nav user={user} />,
      children: [
        {
          path: '/Projects',
          element: <ProjectContainer user={user} userProjectsArray={userProjectsArray}/>
        },
        {
          path: '/Settings',
          element: <Settings user={user} userProjectsArray={userProjectsArray} deleteProject={deleteProject} addProject={addProject}/>
        },
        {
          path: '/Project/:id',
          element: <Project />
        }
      ]
    },
    
         
  ]);
    
    return (
        <div className='dashboard'>
            <div> 
            <RouterProvider router={router} />
            </div>
            

    </div>
    )
}

export default Dashboard;

      