import React from "react";
import NavLink from "./NavLink";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;
const GuestLinks = () => (
  <Container>
    <NavLink to="/register">Sign Up</NavLink>
    <NavLink to="/login">Log In</NavLink>
  </Container>
);

export default GuestLinks;
