import React from "react";
import CommonLinks from "./CommonLinks";
import AuthLinks from "./AuthLinks";
import GuestLinks from "./GuestLinks";

const CollapsableLinks = ({ user, logOut, isAuthenticated }) => (
  <div className="collapse navbar-collapse" id="mobile-nav">
    <CommonLinks />

    {isAuthenticated ? (
      <AuthLinks user={user} onLogoutClick={logOut} />
    ) : (
      <GuestLinks />
    )}
  </div>
);

export default CollapsableLinks;
