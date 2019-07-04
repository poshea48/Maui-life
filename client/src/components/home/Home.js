import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Layout from "../layout/Layout";
import NavigationSide from "./Navigation/NavigationSide";
import NavigationFooter from "./Navigation/NavigationFooter";
import Content from "./Content/Content";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin-top: 1em;
  overflow: visible;
  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

class Home extends PureComponent {
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
    // let homeContent;
    // if (profile === null || loading) {
    //   homeContent = <Spinner />;
    // } else {
    //   // Check if logged in user has profile
    //   if (isEmpty(profile)) {
    //     // User is logged in but no profile
    //     homeContent = (
    //       <div>
    //         <p>You have not yet set up a profile, please add some info</p>
    //         <Link to="/profile/create" className="btn btn-lg btn-info">
    //           Create Profile
    //         </Link>
    //       </div>
    //     );
    //   } else {
    //     homeContent = <ProfileActions onActionClick={this.onActionClick} />;
    //   }
    // }
    return (
      <Layout>
        <Container>
          <NavigationSide user={user} />
          <Content profile={profile} loading={loading} />
          <NavigationFooter user={user} />
        </Container>
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
