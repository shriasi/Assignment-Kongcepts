import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Employee from "./components/employee.component";
import Bank from "./components/bank.component";
import Branch from "./components/branch.component";

function App() {
  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>Banking</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/register"}>Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/employees"}>Employees</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/banks"}>Banks</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/branches"}>Branches</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/employees" component={Employee} />
            <Route path="/banks" component={Bank} />
            <Route path="/branches" component={Branch} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;
