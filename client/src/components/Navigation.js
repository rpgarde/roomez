import React from 'react';
import lightLogo from '../images/light-logo.png'
import Auth from '../utils/auth'

function Navigation({ currentPage, handlePageChange }) {

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <nav className="navbar sticky-top navbar-expand-md navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href={Auth.loggedIn()?"/":"/welcome"}
        >
          <img src={lightLogo} alt="roomEZ" width="100" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {Auth.loggedIn()&&<li className="nav-item">
              <a aria-current="page" href="/bills"
                className={window.location.pathname === '/bills' ? 'nav-link active' : 'nav-link'}
              >
                Bills
              </a>
            </li>}
            {Auth.loggedIn()&&<li className="nav-item">
              <a aria-current="page" href="/chores"
                className={window.location.pathname === '/chores' ? 'nav-link active' : 'nav-link'}
                >
                Chores
              </a>
            </li>}
            {Auth.loggedIn()&&<li className="nav-item">
              <a aria-current="page" href="/messages"
                className={window.location.pathname === '/messages' ? 'nav-link active' : 'nav-link'}
                >
                Messages
              </a>
            </li>}
            </ul>
            <ul className="navbar-nav navbar-right mb-2 mb-lg-0">
            <li className="nav-item">
              {Auth.loggedIn() ? (
                  <a href="/me"
                  className={window.location.pathname === '/me' ? 'nav-link active' : 'nav-link'}
                  >
                    {Auth.getProfile().data.firstName}'s House
                  </a>
              ) : (
                  <a className="nav-link" href="/login">
                    Login
                  </a>
              )}
            </li>
            <li className="nav-item">
              {Auth.loggedIn() ? (
                  <a className="nav-link" href = "/" onClick={logout}>
                    Logout
                  </a>
              ) : (
                  <a className="nav-link" href="/signup">
                    Signup
                  </a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navigation;
