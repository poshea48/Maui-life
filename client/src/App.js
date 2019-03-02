import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/common/PrivateRoute";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import CreateProfile from "./components/profile/CreateProfile";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <div className="container app-content">
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Switch>
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/profile/create" component={CreateProfile} />
            <PrivateRoute exact path="/profile/:id" component={Profile} />
            <PrivateRoute exact path="/profile/user/:id" component={Profile} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
