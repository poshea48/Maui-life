import React from "react";
import NavLink from "./NavLink";
import styled from "styled-components";

const List = styled.ul`
  display: flex;
  margin-right: auto;
  list-style: none;
  margin-bottom: 0;
  padding-left: 0;

  @media (max-width: 575px) {
    flex-direction: column;
  }
`;
const CommonLinks = () => (
  <List>
    <NavLink to="/profiles">Profiles</NavLink>
  </List>
);

export default CommonLinks;
