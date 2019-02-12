import React from 'react'
import PropTypes from 'prop-types'

const TodoItem = (props) => {
  const {todo, onChecked} = props
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 ">
          <span className="">
            <input
              data-id={todo._id}
              type="checkbox"
              id="completed-box"
              onChange={onChecked}
              checked={todo.completed}
            />
          <label htmlFor="completed-box"></label>
          </span>
        </div>
        <div className="col-8">
          <h4 className="text-info">
            {todo.completed ? <s>{todo.name}</s> : todo.name }
          </h4>
          <p className="summary">{todo.description}</p>
        </div>
        <div className="col-2 ">
          <span className="delete">
            <i className="fa fa-trash text-danger"></i>
          </span>
        </div>
      </div>
    </div>

  )
}

export default TodoItem
