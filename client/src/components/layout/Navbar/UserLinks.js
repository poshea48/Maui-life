import React from "react";
import styled from "styled-components";

const List = styled.ul`
  display: flex;
  margin-left: auto;
  list-style: none;
  margin-bottom: 0;
  padding-left: 0;

  @media (max-width: 575px) {
    flex-direction: column;
  }
`;

const UserLinks = ({ children }) => <List>{children}</List>;

export default UserLinks;
