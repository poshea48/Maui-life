import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ListItem = styled.div`
  padding-left: 1em;
  display: flex;
  align-self: center;
`;

const StyledLink = styled(Link)`
  color: ${p => (p.brand ? `#fff` : `rgba(255, 255, 255, 0.5)`)};
  ${
    "" /* padding-top: ${p => (p.brand ? `.3125rem` : `0.5em`)};
  padding-bottom: ${p => (p.brand ? `.3125rem` : `0.5em`)}; */
  }
  font-size: ${p => (p.brand ? `1.55rem` : `1rem`)};
  font-family: ${p => (p.brand ? "fantasy" : "inherit")}

  &:hover {
    color: ${p => (p.brand ? `#fff` : `rgba(255, 255, 255, 1)`)};
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
