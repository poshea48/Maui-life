import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/common/PrivateRoute";
import "./App.css";

import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import CreateProfile from "./components/profile/CreateProfile";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const App = () => (
  <AppContainer>
    <Route exact path="/" component={Landing} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Switch>
      <PrivateRoute path="/home" component={Home} />
      <PrivateRoute path="/profile/create" component={CreateProfile} />
      <PrivateRoute exact path="/profile/:id" component={Profile} />
      <PrivateRoute exact path="/profile/user/:id" component={Profile} />
    </Switch>
  </AppContainer>
);

export default App;
