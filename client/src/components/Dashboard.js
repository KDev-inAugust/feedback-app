import React from 'react';
import {
   createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import ProjectContainer from './ProjectContainer';
import Project from './Project';
import Nav from './Nav';


function Dashboard ({user}){

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
          path: '/projects/:id',
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
            
           


        {/* original nav concept */}

        {/* <nav>
          {user? user.projects.map(index=>{
                return(<li key={index.id}><a href={`/projects/${index.id}`}>{index.name}</a></li>)
            }) : "loading projects"}
        </nav> */}

        {/* <Routes>
            <Route path='/projects/:id' element={<Project />}/>
        </Routes> */}


    </div>
    )
}

export default Dashboard;

      