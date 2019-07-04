import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import { clearCurrentProfile } from "../../../actions/profileActions";
import { clearTodos } from "../../../actions/todoActions";
import CollapsableLinks from "./CollapsableLinks";
import NavLink from "./NavLink";
import styled from "styled-components";

const Container = styled.div`
  background: #343a40 !important;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  z-index: 25;
  display: flex;
  justify-content: space-between;
`;

const Navbar = props => {
  const onLogoutClick = e => {
    e.preventDefault();
    props.clearCurrentProfile();
    props.clearTodos();
    props.logoutUser();
  };
  const { isAuthenticated, user } = props.auth;

  return (
    <Container id="nav">
      <NavLink brand="true" to="/">
        Maui Life
      </NavLink>

      <CollapsableLinks
        user={user}
        logOut={onLogoutClick}
        isAuthenticated={isAuthenticated}
      />
    </Container>
  );
};

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  clearTodos: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile, clearTodos }
)(Navbar);
