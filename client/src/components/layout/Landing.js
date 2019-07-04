import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 100px;
  color: #fff;
  font-family: fantasy;
  @media (max-width: 420px) {
    font-size: 70px;
  }
`;
const P = styled.p`
  font-size: 1.25rem;
  font-weight: 300;
  text-align: center;
  color: #212529;
`;

const LinksWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <Container className="landing">
        <Title>Maui Life</Title>
        <P>Register or Login to see Maui Life</P>
        <hr />
        <LinksWrapper>
          <Link to="/register" className="btn btn-lg btn-dark mr-2">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-lg btn-dark">
            Login
          </Link>
        </LinksWrapper>
      </Container>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Landing);
