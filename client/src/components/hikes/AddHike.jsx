import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { createHike } from "../../actions/hikeActions";
import { clearErrors } from "../../actions/clearErrorAction";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  position: -webkit-sticky;
  top: 50px;
`;
const FormField = styled.div`
  display: block;
  width: 100%;
  height: 50px;
  margin-bottom: ${p => (p.error ? `0` : `0.7em`)};
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  box-sizing: border-box;
  background-color: #fff;
  background-clip: padding-box;
  ${"" /* border: ${p => (p.error ? `3px solid red` : `1px solid #ced4da`)}; */}
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  > input {
    ${"" /* border: none; */}
    ${"" /* border-radius: 20px; */}
    font-size: 12px;
    height: 100%;
    width: 100%;
    padding: 0.375rem 0.75rem;
  }
  input:invalid {
    border-color: red;
  }
`;

const FormFieldShortened = styled(FormField)`
  width: ${p => p.width}%;
  display: inline-block;
  box-sizing: border-box;
`;

const ErrorField = styled.div`
  display: ${p => (p.error ? `inline-block` : `none`)};
  font-size: 18px;
  font-weight: bold;
  color: red;
  width: ${p => p.width}%;
`;

class AddHike extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      location: "",
      date: "",
      rating: "",
      distance: "",
      comments: "",
      errors: {}
    };
  }

  onChange = e => {
    return this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const hike = { ...this.state };
    this.props.createHike(hike);
    return this.setState({
      name: "",
      date: "",
      location: "",
      rating: "",
      distance: "",
      comments: "",
      errors: {}
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
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
      <Container>
        <small className="d-block">* = required field</small>
        <form onSubmit={this.onSubmit}>
          <div className="todo-field">
            <FormField error={errors.name}>
              <input
                name="name"
                placeholder="* Add a Hike"
                type="text"
                value={this.state.name}
                onChange={this.onChange}
              />
            </FormField>
            <ErrorField error={errors.name} width={100}>
              {errors.name}
            </ErrorField>

            <FormField error={errors.location}>
              <input
                name="location"
                placeholder="* Where is this Hike"
                type="text"
                value={this.state.location}
                onChange={this.onChange}
              />
            </FormField>
            <ErrorField error={errors.location} width={100}>
              {errors.location}
            </ErrorField>

            <FormFieldShortened width={50} error={errors.date}>
              <input
                name="date"
                placeholder="* Date of Hike"
                type="date"
                value={this.state.date}
                onChange={this.onChange}
              />
            </FormFieldShortened>

            <FormFieldShortened width={50} error={errors.rating}>
              <input
                name="rating"
                placeholder="* Rating out of 10"
                type="number"
                value={this.state.rating}
                onChange={this.onChange}
              />
            </FormFieldShortened>
            <ErrorField error={errors.date || errors.rating} width={50}>
              {errors.date}
            </ErrorField>
            <ErrorField error={errors.rating || errors.date} width={50}>
              {errors.rating}
            </ErrorField>
            <FormField error={errors.distance}>
              <input
                name="distance"
                placeholder="Distance (miles)"
                type="text"
                value={this.state.distance}
                onChange={this.onChange}
              />
              <div>{errors.distance}</div>
            </FormField>
            <ErrorField error={errors.distance} width={100} />

            <TextAreaFieldGroup
              placeholder="Add a comment"
              name="comments"
              value={this.state.comments}
              onChange={this.onChange}
              error={errors.comments}
            />
            <ErrorField error={errors.comments} width={100} />
          </div>
          <button type="submit" className="btn btn-info btn-block">
            Add
          </button>
        </form>
      </Container>
    );
  }
}

AddHike.propTypes = {
  createHike: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};
export default connect(
  mapStateToProps,
  { createHike }
)(AddHike);
