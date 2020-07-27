import React from "react";
import "./Navbar.css";
import { Link, withRouter } from "react-router-dom";

function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <Link className="navbar-brand" href="#">
        <img
          src="https://www.teachmint.com/static/media/logo-teach.ca6b6d7e.png"
          alt="logo"
          className="website-logo mr-2"
        />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav ml-auto mt-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/home">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <div
              className="nav-link"
              style={{ cursor: "pointer" }}
              onClick={() => {
                localStorage.removeItem("token");
                props.history.push("/");
              }}
            >
              Logout
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);
