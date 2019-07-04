import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// const Container = styled.div`
//   display: flex;
//   justify-content: space-between;
//   cursor: pointer;
// `;
const ActionButton = styled(Link)`
  display: flex;
  justify-content: flex-start;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  margin-bottom: 0.5em;
  color: #17a2b8;

  &:hover {
    background: #fff;
  }

  @media (max-width: 720px) {
    span {
    }
  }
`;

const Icon = styled.div`
  display: inline-block;
  width: 30px !important;
  text-align: left !important;
  i {
    width: 1em !important;
  }

  @media (max-width: 720px) {
    text-align: center !important;
  }
`;

const getIconClassName = name => {
  let icon;
  if (name === "Todos") {
    icon = "fa-clipboard-check";
  } else if (name === "Hikes") {
    icon = "fa-hiking";
  } else if (name === "Photos") {
    icon = "fa-camera";
  } else if (name === "Home") {
    icon = "fa-home";
  } else if (name === "Map") {
    icon = "fa-map-marked-alt";
  }

  return `fas ${icon}`;
};
const ActionLink = ({ endpoint, name }) => (
  <ActionButton to={endpoint}>
    <Icon>
      <i className={getIconClassName(name)} title={name} />
    </Icon>{" "}
    <span>{name}</span>
  </ActionButton>
);

export default ActionLink;
