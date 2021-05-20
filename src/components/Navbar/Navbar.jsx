import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import AuthService from "../../services/AutService";

const Navbar = ({ userInSession, setUser }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const service = new AuthService();
  // KEEP AN EYE ON THE UPDATES OF THIS COMPONENT'S PROPS
  useEffect(() => {
    setLoggedInUser(userInSession);
  }, [userInSession]);

  // FUNCTION TO LOG USER OUT
  const logoutUser = () => {
    service
      .logout()
      .then(() => {
        setLoggedInUser(null);
        setUser(null);
      })
      .catch((err) => console.error(err));
  };

  return loggedInUser ? (
    <nav className="nav-style">
      <div>
        <ul style={{ listStyleType: "none" }} className="loggedinnav">
          <li>
            <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to={`/profile/${loggedInUser._id}`}
              style={{ textDecoration: "none", color: "white" }}
              user={loggedInUser}
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <Link to="/">
          <button className="navbutton" onClick={() => logoutUser()}>
            Logout
          </button>
        </Link>
      </div>
    </nav>
  ) : (
    <nav className="nav-style">
      <div>
        <ul style={{ listStyleType: "none" }}>
          <li>
            <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
              Home
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <ul style={{ listStyleType: "none" }} className="loginsignup">
          <li>
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "white" }}
            >
              Sign Up
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "white" }}
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
