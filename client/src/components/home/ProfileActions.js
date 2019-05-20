import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ActionLink from "./ActionLink";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ProfileActions = props => {
  // <div className="d-flex flex-row flex-wrap justify-content-center">
  // </div>
  return (
    <Container>
      <ActionLink endpoint="/home/todos" name="Todos" />
      <ActionLink endpoint="/home/hikes" name="Hikes" />
      <ActionLink endpoint="/home/photos" name="Photos" />
      <ActionLink endpoint="/home/posts" name="Posts" />
      <ActionLink endpoint="/home/locations" name="Map" />
    </Container>
  );
};

export default ProfileActions;
