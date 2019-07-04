import React from "react";
import styled from "styled-components";
import ProfileActions from "./ProfileActions";
import GravatarIcon from "../../common/GravatarIcon";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  @media (max-width: 720px) {
    display: none;
  }
`;

const NavItems = styled.div`
  ${"" /* position: fixed;
  top: 66px;
  width: 15%; */}
  position: sticky;
  position: -webkit-sticky;
  top: 66px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  margin-bottom: 1em;
  h2 {
    font-size: 1.5em;
  }
`;

const NavigationSide = ({ user }) => (
  <Container id="sticky-el">
    <NavItems>
      <Title>
        <GravatarIcon size="large" name={user.name} avatar={user.avatar} />
        <h2>{user.name}</h2>
      </Title>
      <ProfileActions />
    </NavItems>
  </Container>
);

export default NavigationSide;
