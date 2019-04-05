import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { createHike } from "../../actions/hikeActions";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const FormField = styled.div`
  display: block;
  width: 100%;
  height: 50px;
  margin-bottom: 0.7em;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  > input {
    border: none;
    border-radius: 20px;
    font-size: 14px;
    height: 100%;
    width: 100%;
    padding: 0.375rem 0.75rem;
  }
`;

const FormFieldShortened = styled(FormField)`
  width: ${p => p.width}%;
  display: inline-block;
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

  render() {
    const { errors } = this.state;
    return (
      <Container>
        <h3 className="display-5 text-muted">Add Hike </h3>
        <small className="d-block">* = required field</small>
        <form onSubmit={this.onSubmit}>
          <div className="todo-field">
            <FormField>
              <input
                name="name"
                placeholder="* Name of Hike"
                type="text"
                value={this.state.name}
                onChange={this.onChange}
                error={errors.name}
              />
            </FormField>

            <FormField>
              <input
                name="location"
                placeholder="* Where is this Hike"
                type="text"
                value={this.state.location}
                onChange={this.onChange}
                error={errors.location}
              />
            </FormField>

            <FormFieldShortened width={50}>
              <input
                name="date"
                placeholder="* Date of Hike"
                type="date"
                value={this.state.date}
                onChange={this.onChange}
                error={errors.date}
              />
            </FormFieldShortened>

            <FormFieldShortened width={50}>
              <input
                name="rating"
                placeholder="* Rating out of 10"
                type="number"
                value={this.state.rating}
                onChange={this.onChange}
                error={errors.rating}
              />
            </FormFieldShortened>

            <FormField>
              <input
                name="distance"
                placeholder="Distance (miles)"
                type="text"
                value={this.state.distance}
                onChange={this.onChange}
                error={errors.distance}
              />
            </FormField>

            <TextAreaFieldGroup
              placeholder="Add a comment"
              name="comments"
              value={this.state.comments}
              onChange={this.onChange}
              error={errors.comments}
            />
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
