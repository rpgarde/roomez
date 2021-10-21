import React from 'react';
import lightLogo from '../images/light-logo.png'

function Navigation({ currentPage, handlePageChange }) {
  return (
    <nav className="navbar sticky-top navbar-expand-md navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="/"
        //  onClick={() => handlePageChange('Landing')}
        >
                <img src={lightLogo} alt="roomEZ" width="100"/>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a aria-current="page" href="/bills"
                className={currentPage === 'About' ? 'nav-link active' : 'nav-link'}
                // onClick={() => handlePageChange('About')}
              >
                Bills
              </a>
            </li>
            <li className="nav-item">
              <a aria-current="page" href="/chores"
                className={currentPage === 'Portfolio' ? 'nav-link active' : 'nav-link'}
                // onClick={() => handlePageChange('Portfolio')}
              >
                Chores
              </a>
            </li>          
            <li className="nav-item">
              <a aria-current="page" href="/messages"
                className={currentPage === 'Resume' ? 'nav-link active' : 'nav-link'}
                // onClick={() => handlePageChange('Resume')}
              >
                Messages
              </a>
            </li>
            <li className="nav-item">
              <a aria-current="page" href="/contact"
                className={currentPage === 'Contact' ? 'nav-link active' : 'nav-link'}
                // onClick={() => handlePageChange('Contact')}
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navigation;
