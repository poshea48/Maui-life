import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import isEmpty from '../../validation/is-empty';
// import { Link } from 'react-router-dom';
import { getTodos, toggleCompleted } from '../../actions/todoActions'
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';
import Scroll from '../common/Scroll'

class TodosHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    }
  }
  componentDidMount() {
    this.props.getTodos();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.todos.todos !== prevState.todos) {
      return { todos: nextProps.todos.todos}
    }
    return null
  }

  componentDidUpdate(prevProps) {
    if (prevProps.todos.todos !== this.props.todos.todos) {
      const { todos } = this.props.todos
      this.setState(prevState => ({
        ...prevState,
        ...todos
      }))
    }
  }

  onChecked = e => {
    const todoId = e.target.dataset.id
    this.props.toggleCompleted(todoId)
  }

  render() {
    // const { user } = this.props.auth
    const { todos, loading } = this.props.todos
    let todosContent;

    if ( todos === null || loading) {
      todosContent = <Spinner />
    } else {
      // Check if logged in user has any todos
      if (isEmpty(todos)) {
        // User logged in with no todos
        todosContent = <p>You dont have anything to do yet</p>
      } else {
        todosContent = (
          <div className="todos-content">
            <Scroll>
              <ul className="list-unstyled">
                {todos.map((todo, i) => {
                  return (
                    <li className="todo-content" key={i}>
                      <TodoItem todo={todo} onChecked={this.onChecked} />
                    </li>
                  )
                })}
              </ul>
            </Scroll>
          </div>
        )
      }
    }

    return (
      <div className="home">
        <div className="container">
          <h4 className="text-center mb-4">Here are your Things to DO!</h4>
          <div className="row">
            <div className="col-md-6">
              {todosContent}
            </div>
            <div className="col-md-6">
              <AddTodo />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

TodosHome.propTypes = {
  getTodos: PropTypes.func.isRequired,
  toggleCompleted: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  todos: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  todos: state.todos,
  auth: state.auth
})

export default connect(mapStateToProps, { getTodos, toggleCompleted })(TodosHome);
