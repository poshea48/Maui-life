import React from "react";
import AuthLinks from "./AuthLinks";
import GuestLinks from "./GuestLinks";
import styled from "styled-components";

const Container = styled.div`
  padding-right: 1em;
  align-self: center;
`;

const CollapsableLinks = ({ user, logOut, isAuthenticated }) => (
  <Container>
    {isAuthenticated ? (
      <AuthLinks user={user} onLogoutClick={logOut} />
    ) : (
      <GuestLinks />
    )}
  </Container>
);

export default CollapsableLinks;
