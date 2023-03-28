import React, { useContext } from 'react';
import {
   createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import ProjectContainer from './ProjectContainer';
import Project from './Project';
import Nav from './Nav';
import Settings from './Settings';
import ClientProjectContainer from './Client_Routes/ClientProjectContainer';
import { UserContext } from './App';

function Dashboard ({handleLogout, userProjectsArray, userClientProjectArray, deleteProject, addProject}){
  const userContext=useContext(UserContext);
  console.log("UserContext", userContext)

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Nav handleLogout={handleLogout}/>,
      children: [
        {
          path: '/Projects',
          element: <ProjectContainer 
          user={userContext} 
          userProjectsArray={userProjectsArray}
          userClientProjectArray={userClientProjectArray}/>
        },
        {
          path: '/Settings',
          element: <Settings user={userContext} userProjectsArray={userProjectsArray} deleteProject={deleteProject} addProject={addProject}/>
        },
        {
          path: '/Project/:id',
          element: <Project />
        },
        {
          path: 'ClientProject/:id',
          element: <ClientProjectContainer />
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

      