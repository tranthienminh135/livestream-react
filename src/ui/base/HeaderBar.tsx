import React from "react";
import { Link } from "react-router-dom";

const HeaderBar = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body bg-dark">
        <div className="container-fluid">
          <button
            data-mdb-collapse-init
            className="navbar-toggler"
            type="button"
            data-mdb-target="#navbarExample01"
            aria-controls="navbarExample01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarExample01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item active">
                <Link to="/" className="nav-link">
                  Customer List
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/create" className="nav-link">
                  Create
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderBar;
