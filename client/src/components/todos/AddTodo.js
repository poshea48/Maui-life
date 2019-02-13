import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { createTodo } from '../../actions/todoActions';

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
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
    const todo = {...this.state}
    this.props.createTodo(todo, this.props.history)
    return this.setState({
      name: '',
      description: '',
      errors: {}
    })
  }

  render () {
    const { errors } = this.state
    return (
      <div className="add-todo">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h4 className="display-5 text-muted">Add Something </h4>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <div className="todo-field">
                  <TextFieldGroup
                    name="name"
                    placeholder="* What do you wanna do"
                    type="text"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextAreaFieldGroup
                    placeholder="Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    error={errors.description}
                  />
                </div>
                <button type="submit" className="btn btn-info btn-block">Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )

  }
}

AddTodo.propTypes = {
  createTodo: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    errors: state.errors
  }
}
export default connect(mapStateToProps, {createTodo})(AddTodo);
