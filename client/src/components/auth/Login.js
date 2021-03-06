import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { clearErrors } from "../../actions/clearErrorAction";
import TextFieldGroup from "../common/TextFieldGroup";
import Layout from "../layout/Layout";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const user = { ...this.state };
    this.props.loginUser(user);
  };

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  };

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.errors) {
  //     return { errors: nextProps.errors };
  //   }
  //   return null;
  // }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
    if (this.props.auth.isAuthenticated) {
      this.setState({ isAuthenticated: this.props.auth.isAuthenticated });
      this.props.history.push("/home");
    }
  }

  componentWillUnmount() {
    if (Object.keys(this.props.errors).length > 0) {
      this.props.clearErrors();
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <Layout>
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">Sign in to your account</p>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    label="Email Address"
                    error={errors.login}
                  />

                  <TextFieldGroup
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    label="Password"
                    error={errors.login}
                  />
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser, clearErrors }
)(Login);
