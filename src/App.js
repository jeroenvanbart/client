import React, { useState } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";


import Signup from "./components/Auth/Signup.jsx";
import Login from "./components/Auth/login.jsx";
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Profile from './pages/Profile'
import ProtectedRoute from "./components/Auth/ProtectedRoute";

import AuthService from "./services/AutService";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const service = new AuthService();

  // CHECK IF USER IS LOGGED IN BY CONFIRMING WITH THE BACKEND
  const fetchUserFromBE = () => {
    if (loggedInUser === null) {
      service
        .isLoggedIn()
        .then((response) => {
          setLoggedInUser(response);
        })
        .catch((err) => {
          setLoggedInUser(false);
        });
    }
  };

  // SET THE GLOBAL APP STATE WITH THE LOGGED IN USER
  const setTheUserToGlobalState = (userObj) => setLoggedInUser(userObj);

  // CALL THE AUTHENTICATION CHECK EVERY TIME THE APP LOADS
  fetchUserFromBE();

  return loggedInUser ? (
    
    <div className="App">
      <Navbar userInSession={loggedInUser} setUser={setTheUserToGlobalState} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" render={() => <Redirect to="/profile/:id"/>} />
        <ProtectedRoute
          user={loggedInUser}
          exact
          path="/profile"
          component={Profile}
        />
    </Switch>
    </div>
  ) : (
    <div className="App">
      <Navbar userInSession={loggedInUser} setUser={setTheUserToGlobalState} />

      <Switch>
        <Route
          path="/signup"
          render={() => <Signup setUser={setTheUserToGlobalState} />}
        />
        
        <Route
          path="/login"
          render={() => <Login setUser={setTheUserToGlobalState} />}
        />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
