import { NavLink } from 'react-router-dom';
import Login from '../login page/login';
import './header.css';
import '../../assets/css/header/fontawesome.min.css';
import '../../assets/css/header/mdb.min.css';
import '../../assets/css/header/mdbBootstrap.min.css';
import '../../assets/css/header/mdbPro.min.css';
function Header() {
  return (<>
    {/* <!-- Navbar --> */}

    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Logo</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
      <ul class="navbar-nav">
        <li className="nav-item text-center mx-2 mx-lg-1">
              <a className="nav-link icon-color" href="#!">
                <div>
                  <i className="fas fa-home fa-lg mb-1"></i>
                  <span className="badge rounded-pill badge-notification bg-info">11</span>
                </div>
                Home
              </a>
            </li>
        <li className="nav-item text-center mx-2 mx-lg-1">
              <a className="nav-link icon-color" href="#!">
                <div>
                  <i className="fas fa-envelope fa-lg mb-1"></i>
                  <span className="badge rounded-pill badge-notification bg-info">11</span>
                </div>
                Link
              </a>
            </li>
        <li className="nav-item text-center mx-2 mx-lg-1">
              <a className="nav-link icon-color" href="#!">
                <div>
                  <i className="fas fa-bell fa-lg mb-1"></i>
                  <span className="badge rounded-pill badge-notification bg-info">11</span>
                </div>
                Messages
              </a>
            </li>
            <li className="nav-item text-center mx-2 mx-lg-1">
              <a className="nav-link icon-color" href="#!">
                <div>
                  <i className="fas fa-globe-americas fa-lg mb-1"></i>
                  <span className="badge rounded-pill badge-notification bg-success">11</span>
                </div>
                News
              </a>
            </li>
           

          
        
      </ul>
     
    </div>
<ul className='icon-margin-bottom'>
    <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle icon-color" href="#" role="button" data-bs-toggle="dropdown">

          <div className='align-icon-center'>
                  <i className="fas fa-user fa-lg mb-1"></i>
                </div>
          Hi, Sanju</a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Log out</a></li>
          </ul>
        </li>
          {/* <!-- Right links --> */}

          
        
      </ul>
     
  </div>
</nav>

  </>);
}

export default Header;