import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../common/Spinner";
import isEmpty from "../../validation/is-empty";
import { getHikes } from "../../actions/hikeActions";
import AddHike from "./AddHike";
import HikeItem from "./HikeItem";
// import Scroll from '../common/Scroll'
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
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

const FixedSection = styled(Section)`
  margin-top: 35px;

  @media (max-width: 720px) {
    margin-top: 0;
  }
`;

const Title = styled.h3`
  text-align: center;
  height: 1.2em;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  @media (max-width: 720px) {
    flex-direction: row;
    flex-wrap: none;
    overflow-x: scroll;
    border-bottom: 0;
  }
`;

const HikesHome = () => {
  const hikes = useSelector(state => {
    return state.hikes.hikes;
  });
  const errors = useSelector(state => {
    return state.errors;
  });
  const dispatch = useDispatch();
  const getHikesFromStore = useCallback(() => dispatch(getHikes()), [dispatch]);
  useEffect(
    () => {
      console.log("in useEffect");
      getHikesFromStore();
    },
    [getHikesFromStore]
  );

  const loading = useSelector(state => state.hikes.loading);
  // const auth = useSelector(state => state.auth);
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
        <Scroll>
          {hikes.map((hike, i) => {
            return (
              <div key={i}>
                <HikeItem hike={hike} />
              </div>
            );
          })}
        </Scroll>
      );
    }
  }
  return (
    <Container>
      <Content>
        <Section>
          <Title>Your Hikes!</Title>

          {hikesContent}
        </Section>
        <FixedSection>
          <AddHike errors={errors} />
        </FixedSection>
      </Content>
    </Container>
  );
};

// const mapStateToProps = ({ hikes, auth }) => ({
//   hikes,
//   auth
// });
//
// export default connect(
//   mapStateToProps,
//   { getHikes }
// )(HikesHome);

export default HikesHome;
