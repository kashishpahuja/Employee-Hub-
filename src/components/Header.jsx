import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-4">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        
        <h1 className="navbar-brand mb-0 text-white">
          Employee HUB
        </h1>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" aria-current="page" to="/">
                Employee List
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" aria-current="page" to="/add">
                Add Employees
              </Link>
            </li>
          </ul>
        </div>
        
      </div>
    </nav>
  );
}

export default Header;
