import React from "react";
import { Link } from "react-router-dom";

const getIconClassName = name => {
  let icon;
  if (name === "Todos") {
    icon = "fa-clipboard-check";
  } else if (name === "Hikes") {
    icon = "fa-hiking";
  } else if (name === "Photos") {
    icon = "fa-camera";
  } else if (name === "Posts") {
    icon = "fa-thumbtack";
  } else if (name === "Map") {
    icon = "fa-map-marked-alt";
  }

  return `fas ${icon} text-dark mr-1`;
};
const ActionLink = ({ endpoint, name }) => (
  <Link to={endpoint} className="col-2 btn btn-sm btn-primary mr-1 mb-1">
    <i className={getIconClassName(name)} />
    <span className="d-none d-sm-inline">{name}</span>
  </Link>
);

export default ActionLink;
