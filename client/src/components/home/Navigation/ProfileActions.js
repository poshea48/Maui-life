import React from "react";
import styled from "styled-components";
import ActionLink from "./ActionLink";
import GravatarIcon from "../../common/GravatarIcon";

const Container = styled.div`
  display: flex;
  flex-direction: ${p => (p.footer ? `row` : `column`)};
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;

  svg {
    color: ${p => (p.footer ? `#17a2b8!important` : `#343a40!important`)};
  }

  span {
    @media (max-width: 720px) {
      display: none;
    }
  }
`;

const GravWrapper = styled.div`
  display: ${p => (p.footer ? `inline` : `none`)};
`;

const ProfileActions = ({ footer, user }) => {
  return (
    <Container footer={footer}>
      <GravWrapper footer={footer}>
        <GravatarIcon
          footer={footer}
          size="large"
          name={user && user.name}
          avatar={user && user.avatar}
        />
      </GravWrapper>

      <ActionLink endpoint="/home" name="Home" />
      <ActionLink endpoint="/home/todos" name="Todos" />
      <ActionLink endpoint="/home/hikes" name="Hikes" />
      <ActionLink endpoint="/home/photos" name="Photos" />
      <ActionLink endpoint="/home/locations" name="Map" />
    </Container>
  );
};

export default ProfileActions;
