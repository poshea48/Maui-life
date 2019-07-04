import React from "react";
import styled from "styled-components";

const Image = styled.img`
  width: ${p => (p.size === "large" ? `30px` : `25px`)};
  height: ${p => (p.size === "large" ? `30px` : `25px`)};
  margin-right: ${p => (p.footer ? `0` : `5px`)};
  border-radius: 50%;
`;

const GravatarIcon = ({ name, avatar, size, footer }) => (
  <Image
    footer={footer}
    size={size}
    src={avatar}
    alt={name}
    title="You must have a gravatar connected to email to display an image"
  />
);

export default GravatarIcon;
