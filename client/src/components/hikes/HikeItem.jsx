import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #17a2b8;
  margin-bottom: 1em;
  border-radius: 20px;
  border: 1px solid #6c757d;
  padding: 1em;
  @media (max-width: 575px) {
    height: 180px;
    width: 200px;
    margin-right: 1em;
  }
`;

const Title = styled.h3`
  text-align: center;
  font-weight: 600;
  font-family: "Arial Narrow", Arial, sans-serif;
  position: relative;
  padding-bottom: .3em;
  &:before {
    content: "";
    position: absolute;
    width: 50%;
    height: 1px;
    bottom: 0;
    left: 25%;
    border-bottom: 2px solid black;
`;

const Field = styled.p``;
class HikeItem extends Component {
  render() {
    const { hike } = this.props;
    return (
      <Container>
        <Title>{hike.name}</Title>
        {/* <Location location={hike.location} */}
        <Field>Rating: {hike.rating}</Field>
        {hike.distance && <Field>Distance: {hike.distance}</Field>}
        {hike.comments && <Field>Comments: {hike.comments}</Field>}
      </Container>
    );
  }
}

export default HikeItem;
