import React from 'react'

const TodoItem = (props) => {
  const {todo, onChecked, deleteTodo} = props
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 ">
          <span className="">
            <input
              type="checkbox"
              id="completed-box"
              onChange={onChecked(todo._id)}
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
        <div className="col-2"
          onClick={deleteTodo(todo._id)}
          style={{cursor: "pointer"}}>
          <span className="delete">
            <i className="fa fa-trash text-danger"></i>
          </span>
        </div>
      </div>
    </div>

  )
}

export default TodoItem
