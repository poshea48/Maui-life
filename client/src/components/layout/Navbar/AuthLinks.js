import React from "react";
import LinksWrapper from "./LinksWrapper";
import NavLink from "./NavLink";
import LogOutNav from "./LogOutNav";

const AuthLinks = ({ user, onLogoutClick }) => (
  <LinksWrapper>
    <NavLink to="/home">Home</NavLink>
    <NavLink to={`/profile/${user.id}`}>Profile</NavLink>
    <LogOutNav
      name={user.name}
      avatar={user.avatar}
      onLogoutClick={onLogoutClick}
    />
  </LinksWrapper>
);

export default AuthLinks;
