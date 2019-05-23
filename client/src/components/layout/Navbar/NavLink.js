import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ListItem = styled.li`
  padding: 0;
  height: 40px;
  display: flex;
`;

const StyledLink = styled(Link)`
  color: ${p => (p.brand ? `#fff` : `rgba(255, 255, 255, 0.5)`)};
  padding-top: ${p => (p.brand ? `.3125rem` : `0.5em`)};
  padding-bottom: ${p => (p.brand ? `.3125rem` : `0.5em`)};
  font-size: ${p => (p.brand ? `1.55rem` : `1rem`)};
  padding-left: 0.5em;
  padding-right: 0.5em;

  &:hover {
    color: ${p => (p.brand ? `#fff` : `rgba(255, 255, 255, 1)`)};
  }

  @media (max-width: 575px) {
    padding-left: 0;
    padding-right: 0;
  }
`;
const NavLink = ({ to, children, brand }) => (
  <ListItem>
    <StyledLink brand={brand} to={to}>
      {children}
    </StyledLink>
  </ListItem>
);

export default NavLink;
