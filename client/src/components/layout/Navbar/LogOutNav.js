import React from "react";
import styled from "styled-components";

const ListItem = styled.li`
  padding: 0;
  display: flex;
`;
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

const Image = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 5px;
  border-radius: 50%;
`;
const LogOutNav = ({ name, avatar, onLogoutClick }) => (
  <ListItem>
    <Button onClick={onLogoutClick}>
      <Image
        src={avatar}
        alt={name}
        title="You must have a gravatar connected to email to display an image"
      />
      Logout
    </Button>
  </ListItem>
);

export default LogOutNav;
