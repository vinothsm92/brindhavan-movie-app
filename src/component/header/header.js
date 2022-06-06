import { NavLink } from 'react-router-dom';
import Login from '../login page/login';
import './header.css';
import '../../assets/css/header/fontawesome.min.css';
import '../../assets/css/header/mdb.min.css';
import '../../assets/css/header/mdbBootstrap.min.css';
import '../../assets/css/header/mdbPro.min.css';
import React from "react"
function Header(props) {
 
  return (<>
    {/* <!-- Navbar --> */}
    
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Logo</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        { localStorage.getItem("user_name") ?<React.Fragment>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item text-center mx-2 mx-lg-1">
             
                <NavLink className="NavLink" to="/home"> <a className="nav-link icon-color">
                <div>
                  <i className="fas fa-home fa-lg mb-1"></i>
                  {/* <span className="badge rounded-pill badge-notification bg-info">11</span> */}
                </div>  Home  </a></NavLink>
            </li>
            <li className="nav-item text-center mx-2 mx-lg-1">
             
                <NavLink className="NavLink" to="/movie"> <a className="nav-link icon-color" href="#!">
                <div>
                  <i className="fas fa-video-camera fa-lg mb-1"></i>
                  {/* <span className="badge rounded-pill badge-notification bg-info">11</span> */}
                </div> Movies</a></NavLink>
            </li>
            <li className="nav-item text-center mx-2 mx-lg-1">
              
                <NavLink className="NavLink" to="/ticketbooking"><a className="nav-link icon-color" href="#!">
                <div>
                  <i className="fas fa-ticket fa-lg mb-1"></i>
                  {/* <span className="badge rounded-pill badge-notification bg-info">11</span> */}
                </div>
                Ticket Booking
              </a></NavLink>
            </li>
            <li className="nav-item text-center mx-2 mx-lg-1">
                <NavLink className="NavLink" to="/bookingHistory"> <a className="nav-link icon-color" href="#!">
                <div>
                  <i className="fas fa-book fa-lg mb-1"></i>
                  {/* <span className="badge rounded-pill badge-notification bg-success">11</span> */}
                </div> Booking history
              </a></NavLink>
            </li>
          </ul>

        </div>
        <ul className='icon-margin-bottom'>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle icon-color" href="#" role="button" data-bs-toggle="dropdown">

              <div className='align-icon-center'>
                <i className="fas fa-user fa-lg mb-1"></i>
              </div>
              Hi, {props.userName}</a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Log out</a></li>
            </ul>
          </li>
        
        </ul> </React.Fragment>:""}
       
      </div>
    </nav>
  </>);
}

export default Header;