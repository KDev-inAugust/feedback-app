import React from 'react';
import {
   createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import ProjectContainer from './ProjectContainer';
import Project from './Project';
import Nav from './Nav';
import Settings from './Settings';


function Dashboard ({user, deleteProject, addProject}){

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Nav user={user} />,
      children: [
        {
          path: '/Projects',
          element: <ProjectContainer user={user}/>
        },
        {
          path: '/Settings',
          element: <Settings user={user} deleteProject={deleteProject} addProject={addProject}/>
        },
        {
          path: '/Project/:id',
          element: <Project />
        }
      ]
    },
    
         
  ]);
  console.log(user.projects)
    
    return (
        <div className='dashboard'>
            <div> 
            <RouterProvider router={router} />
            </div>
            

    </div>
    )
}

export default Dashboard;

      