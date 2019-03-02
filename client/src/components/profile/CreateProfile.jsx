import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import { createProfile } from "../../actions/profileActions";
// import { withRouter } from 'react-router-dom'; // maybe not needed

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      username: "",
      location: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      return { errors: this.props.errors };
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return { errors: nextProps.errors }; // equivalent to setState
    }
  }

  onChange = e => {
    return this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const profile = { ...this.state };
    this.props.createProfile(profile, this.props.history);
  };

  openSocialMediaField = e => {
    e.preventDefault();
    this.setState(prevState => {
      return { displaySocialInputs: !prevState.displaySocialInputs };
    });

    if (this.state.displaySocialInputs) {
    }
  };
  render() {
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = [
        "Twitter",
        "Facebook",
        "Linkedin",
        "Youtube",
        "Instagram"
      ].map((social, i) => (
        <div key={i}>
          <InputGroup
            placeholder={`${social} Profile URL`}
            name={social.toLowerCase()}
            icon={`fab fa-${social.toLowerCase()}`}
            value={this.state[social.toLowerCase()]}
            onChange={this.onChange}
            error={errors[social.toLowerCase()]}
          />
        </div>
      ));
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Lets get some information to make your profile
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL.  Your full name, company name, nickname"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Where do you reside?"
                />

                <TextAreaFieldGroup
                  placeholder="A short bio of yourself"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Talk about yourself"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={this.openSocialMediaField}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(CreateProfile);
