import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import { clearCurrentProfile } from "../../../actions/profileActions";
import { clearTodos } from "../../../actions/todoActions";
import CollapsableLinks from "./CollapsableLinks";
import NavLink from "./NavLink";

const Navbar = props => {
  const onLogoutClick = e => {
    e.preventDefault();
    props.clearCurrentProfile();
    props.clearTodos();
    props.logoutUser();
  };
  const { isAuthenticated, user } = props.auth;

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <NavLink brand="true" to="/">
          Maui Life
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
          aria-expanded="true"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <CollapsableLinks
          user={user}
          logOut={onLogoutClick}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </nav>
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
