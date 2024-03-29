import { NavLink, Outlet } from "react-router-dom";
export default function Nav({handleLogout}){

    

    return (
        <div>

        <button id="logout-button"><NavLink to='/' onClick={handleLogout}>Logout</NavLink></button>
        <div id="nav-container">
            <div className="link-container">
                <nav className="nav-link">
                        <NavLink to='/Projects' className="nav-link">Projects</NavLink>
                </nav>
                <nav className="nav-link">
                        <NavLink to='/Settings' className="nav-link">Settings</NavLink>
                </nav>
            </div>
            <div id="outlet">
              <Outlet />
            </div>
        </div>
       
        </div>
    )
}
