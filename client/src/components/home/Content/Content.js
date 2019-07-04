import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Posts from "../../posts/Posts";
import styled from "styled-components";

// code split Todos/Hikes/locations/pictures
const TodosHome = lazy(() => import("../../todos/TodosHome"));
const HikesHome = lazy(() => import("../../hikes/HikesHome"));
const LocationsHome = lazy(() => import("../../locations/LocationsHome"));
const PicturesHome = lazy(() => import("../../pictures/PicturesHome"));

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 80%;
  max-width: 800px;
`;
const Content = () => (
  <Container>
    <Switch>
      <Redirect exact from="/home" to="/home/posts" />
      <Route path="/home/posts" component={Posts} />
      <Suspense fallback={<div>Loading...</div>}>
        <Route path="/home/todos" component={TodosHome} />
        <Route path="/home/hikes" component={HikesHome} />
        <Route path="/home/locations" component={LocationsHome} />
        <Route path="/home/photos" component={PicturesHome} />
      </Suspense>
    </Switch>
  </Container>
);

export default Content;
