import React from "react";
import UserLinks from "./UserLinks";
import NavLink from "./NavLink";
import LogOutNav from "./LogOutNav";

const AuthLinks = ({ user, onLogoutClick }) => (
  <UserLinks>
    <NavLink to="/home">Home</NavLink>
    <NavLink to={`/profile/${user.id}`}>Profile</NavLink>
    <LogOutNav
      name={user.name}
      avatar={user.avatar}
      onLogoutClick={onLogoutClick}
    />
  </UserLinks>
);

export default AuthLinks;
