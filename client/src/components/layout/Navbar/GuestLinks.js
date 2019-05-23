import React from "react";
import NavLink from "./NavLink";
import UserLinks from "./UserLinks";

const GuestLinks = () => (
  <UserLinks>
    <NavLink to="/register">Sign Up</NavLink>
    <NavLink to="/login">Log In</NavLink>
  </UserLinks>
);

export default GuestLinks;
