import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import isEmpty from '../../validation/is-empty';
// import { Link } from 'react-router-dom';
import { getTodos, toggleCompleted, deleteTodo } from '../../actions/todoActions'
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

  onChecked = (todoId) => () => {
    this.props.toggleCompleted(todoId)
  }

  deleteTodo = (todoId) => () => {
    this.props.deleteTodo(todoId)
  }

  render() {
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
                      <TodoItem
                        todo={todo}
                        onChecked={this.onChecked}
                        deleteTodo={this.deleteTodo}
                      />
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
          <h3 className="text-center text-muted mb-4">Your Things to DO!</h3>
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
  deleteTodo: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  todos: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  todos: state.todos,
  auth: state.auth
})

export default connect(mapStateToProps, { getTodos, toggleCompleted, deleteTodo })(TodosHome);
