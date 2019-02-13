import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { createHike } from '../../actions/hikeActions';

class AddHike extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: '',
      date: '',
      rating: '',
      distance: '',
      comments: '',
      errors: {}
    }
  }

  onChange = e => {
    return this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault();
    const hike = {...this.state}
    this.props.createHike(hike)
    return this.setState({
      name: '',
      date: '',
      location: '',
      rating: '',
      distance: '',
      comments: '',
      errors: {}
    })
  }

  render () {
    const { errors } = this.state
    return (
      <div className="add-hike d-flex flex-column">
        <div className="col-md-12">
          <h3 className="display-5 text-muted">Add Hike </h3>
          <small className="d-block">* = required field</small>
          <form onSubmit={this.onSubmit}>
            <div className="todo-field">
              <TextFieldGroup
                name="name"
                placeholder="* Name of Hike"
                type="text"
                value={this.state.name}
                onChange={this.onChange}
                error={errors.name}
              />
              <TextFieldGroup
                name="date"
                placeholder="* Date of Hike"
                type="date"
                value={this.state.date}
                onChange={this.onChange}
                error={errors.date}
              />
              <TextFieldGroup
                name="location"
                placeholder="* Where is this Hike"
                type="text"
                value={this.state.location}
                onChange={this.onChange}
                error={errors.location}
              />
              <TextFieldGroup
                name="rating"
                placeholder="* Rate this Hike out of 10"
                type="number"
                value={this.state.rating}
                onChange={this.onChange}
                error={errors.rating}
              />
              <TextFieldGroup
                name="distance"
                placeholder="How far did you go"
                type="text"
                value={this.state.distance}
                onChange={this.onChange}
                error={errors.distance}
              />
              <TextAreaFieldGroup
                placeholder="Add a comment"
                name="comments"
                value={this.state.comments}
                onChange={this.onChange}
                error={errors.comments}
              />
            </div>
            <button type="submit" className="btn btn-info btn-block">Add</button>
          </form>
        </div>
      </div>
    )

  }
}

AddHike.propTypes = {
  createHike: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    errors: state.errors
  }
}
export default connect(mapStateToProps, {createHike})(AddHike);
