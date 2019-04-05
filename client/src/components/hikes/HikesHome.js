import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import isEmpty from "../../validation/is-empty";
import { getHikes } from "../../actions/hikeActions";
import AddHike from "./AddHike";
import HikeItem from "./HikeItem";
// import Scroll from '../common/Scroll'
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

const Section = styled.div`
  width: 48%;
  @media (max-width: 720px) {
    width: 100%;
  }
`;

const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 380px;
  margin-bottom: 10px;
  border-radius: 5px;
  border-bottom: 40px solid #17a2b8;
  @media (max-width: 720px) {
    flex-direction: row;
    flex-wrap: none;
    overflow-x: scroll;
    border-bottom: 0;
  }
`;

class HikesHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hikes: []
    };
  }
  componentDidMount() {
    this.props.getHikes();
  }

  render() {
    const { hikes, loading } = this.props.hikes;
    let hikesContent;

    if (hikes === null || loading) {
      hikesContent = <Spinner />;
    } else {
      // Check if logged in user has any todos
      if (isEmpty(hikes)) {
        // User logged in with no todos
        hikesContent = <p>No hikes recorded yet</p>;
      } else {
        hikesContent = (
          <div className="hikes-content">
            <Scroll>
              {hikes.map((hike, i) => {
                return (
                  <div className="hikes-content" key={i}>
                    <HikeItem hike={hike} />
                  </div>
                );
              })}
            </Scroll>
          </div>
        );
      }
    }
    return (
      <Container>
        <Section>
          <h3 className="display-5 text-muted mb-4">Your Hikes!</h3>
          {hikesContent}
        </Section>
        <Section>
          <AddHike />
        </Section>
      </Container>
    );
  }
}

HikesHome.propTypes = {
  getHikes: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  hikes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  hikes: state.hikes,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getHikes }
)(HikesHome);
