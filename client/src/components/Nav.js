import { NavLink, Outlet } from "react-router-dom";
export default function Nav({user}){

    

    return (
        <div>
            <div className="nav-container">
                <nav className="nav-link">
                        <NavLink to='/Projects' className="nav-link">Projects</NavLink>
                </nav>
                <nav className="nav-link">
                        <NavLink to='/Settings' className="nav-link">Settings</NavLink>
                </nav>
            </div>
            <div>
              <Outlet />
            </div>
        </div>
       
    )
}




// {user? user.projects.map(index=>{
//     return(<Link to={`/projects/${index.id}`}>{index.name}</Link>)
// }) : "loading projects"}