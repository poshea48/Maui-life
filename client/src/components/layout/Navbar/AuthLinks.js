import React from "react";
import styled from "styled-components";

const Container = styled.div``;
const Button = styled.button`
  background-color: #343a40 !important;
  color: rgba(255, 255, 255, 0.5);
  padding: 0.5em 0.5em;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  align-items: center !important;
  &:hover {
    color: rgba(255, 255, 255, 1);
  }

  @media (max-width: 575px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

const AuthLinks = ({ user, onLogoutClick }) => (
  <Container>
    <Button onClick={onLogoutClick}>Logout</Button>
  </Container>
);

export default AuthLinks;
