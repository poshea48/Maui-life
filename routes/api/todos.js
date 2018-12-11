const express = require('express');
const router = express.Router();
const passport = require('passport')

// Load Input Validation
const validateTodoInput = require('../../validation/create-todo');

// Load Todo model
const Todo = require('../../models/Todo');
const todos = [
  "Volleyball",
  "Beach drank",
  "Haleakala sunset",
  "Hana hikes- puka, frog falls",
  "Waihee hike",
  "Resort hot tub crash",
  "Snorkel- possibly Molokini",
  "Whale watch",
  "Lahaina bars"
]
// @route GET '/todos'
// @desc list all todos
// @access Private
router.get('/', (req, res) => {
  // Get all todos from db
  Todo.find((err, todos, count) => {
    if (todos) {
      return res.json(todos)
    } else {
      return res.json({msg: "No todos"})
    }
  })
  // display them
})

// @route POST '/todos'
// @desc create a todo
// @access Private
router.post('/', (req, res) => {
  const { errors, isValid } = validateTodoInput(req.body);

  if(!isValid) {
    return res.status(404).json(errors);
  }
  // Add todo to list
  Todo.findOne({ name: req.body.name }).then(todo => {
    if (todo) {
      errors.name = "Todo already exists"
      return res.status(404).json(errors)
    } else {
      new Todo({ name: req.body.name }).save()
        .then(todo => res.json(todo))
        .catch(err => console.log(err));
    }
  })
})

module.exports = router;
