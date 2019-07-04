import React from "react";
import styled from "styled-components";
import ProfileActions from "./ProfileActions";

const NavItems = styled.div`
  position: fixed;
  background: #343a40;
  color: #fff;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  justify-content: center;
  padding: 0.5em 1em;
  @media (min-width: 721px) {
    display: none;
  }
`;

const NavigationFooter = ({ user }) => (
  <NavItems>
    <ProfileActions footer={true} user={user} />
  </NavItems>
);

export default NavigationFooter;
