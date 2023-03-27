import React from 'react';
import {
   createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import ProjectContainer from './ProjectContainer';
import Project from './Project';
import Nav from './Nav';
import Settings from './Settings';
import ClientProject from './ClientProject';


function Dashboard ({user, handleLogout, userProjectsArray, userClientProjectArray, deleteProject, addProject}){

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Nav handleLogout={handleLogout}/>,
      children: [
        {
          path: '/Projects',
          element: <ProjectContainer 
          user={user} 
          userProjectsArray={userProjectsArray}
          userClientProjectArray={userClientProjectArray}/>
        },
        {
          path: '/Settings',
          element: <Settings user={user} userProjectsArray={userProjectsArray} deleteProject={deleteProject} addProject={addProject}/>
        },
        {
          path: '/Project/:id',
          element: <Project />
        },
        {
          path: 'ClientProject/:id',
          element: <ClientProject />
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

      