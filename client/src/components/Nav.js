import { Link, Outlet } from "react-router-dom";
export default function Nav({user}){

   

    return (
        <div>
            <Link to='/'>Dashboard</Link>
            <Link to='/Projects'>Projects</Link>
            <Link to='/Settings'>Settings</Link>
            
            <div>
              <Outlet />
            </div>
        </div>
       
    )
}




// {user? user.projects.map(index=>{
//     return(<Link to={`/projects/${index.id}`}>{index.name}</Link>)
// }) : "loading projects"}