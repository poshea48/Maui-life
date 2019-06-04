import React, { Suspense, lazy, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import isEmpty from "../../validation/is-empty";
import { Link, Route, Switch, Redirect } from "react-router-dom";
import ProfileActions from "./ProfileActions";
import Posts from "../posts/Posts";
import Layout from "../layout/Layout";
import styled from "styled-components";

// code split Todos/Hikes/locations/pictures
const TodosHome = lazy(() => import("../todos/TodosHome"));
const HikesHome = lazy(() => import("../hikes/HikesHome"));
const LocationsHome = lazy(() => import("../locations/LocationsHome"));
const PicturesHome = lazy(() => import("../pictures/PicturesHome"));

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todosOpen: false,
      hikesOpen: false,
      locationsOpen: false,
      picturesOpen: false,
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      return this.setState({ errors: this.props.errors });
    }
  }

  onActionClick = e => {
    e.preventDefault();
    const onAction = e.target.dataset.action + "Open";
    const offAction = this.findOnAction();
    this.setState({
      [onAction]: true,
      [offAction]: false
    });
  };

  findOnAction = () => {
    return Object.keys(this.state).filter(action => this.state[action])[0];
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let homeContent;
    if (profile === null || loading) {
      homeContent = <Spinner />;
    } else {
      // Check if logged in user has profile
      if (isEmpty(profile)) {
        // User is logged in but no profile
        homeContent = (
          <div>
            <p>You have not yet set up a profile, please add some info</p>
            <Link to="/profile/create" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      } else {
        homeContent = <ProfileActions onActionClick={this.onActionClick} />;
      }
    }
    return (
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-12">
              <h1 className="text-center text-muted">
                Welcome Home {user.name}
              </h1>
            </div>
            <div className="col-lg-7 col-md-12 pd-0">{homeContent}</div>
          </div>
        </div>
        <div className="action-content">
          <div className="mb-4" />
          <Switch>
            <Redirect exact from="/home" to="/home/posts" />
            <Route path="/home/posts" component={Posts} />
            <Suspense fallback={<div>Loading...</div>}>
              <Route path="/home/todos" component={TodosHome} />
              <Route path="/home/hikes" component={HikesHome} />
              <Route path="/home/locations" component={LocationsHome} />
              <Route path="/home/photos" component={PicturesHome} />
            </Suspense>
          </Switch>
        </div>
      </Layout>
    );
  }
}

Home.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Home);
