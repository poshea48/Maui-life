import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NoMatch = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  margin-top: 50px;
`;

const NoMatchPage = () => {
  return (
    <NoMatch>
      <h3>404 - Not found</h3>
      <Link to="/">Go back</Link>
    </NoMatch>
  );
};

export default NoMatchPage;
