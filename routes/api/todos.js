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
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
  // Get all todos from db
  console.log("inside backend Todo.find")
  
    Todo.find({user: req.user.id})
      .then(todos => {
        if (todos) {
          return res.json(todos)
        } else {
          return res.json({msg: "No Todos yet"})
        }
      })
      .catch(err => res.json({error: err}))
  // display them
})

// @route POST '/todos'
// @desc create a todo
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTodoInput(req.body);

    if(!isValid) {
      return res.status(404).json(errors);
    }
    // Add todo to list
    Todo.findOne({ user: req.user.id, name: req.body.name })
    .then(todo => {
      if (todo) {
        errors.name = "Todo already exists"
        return res.status(404).json(errors)
      } else {
        console.log(req.body)
        new Todo({user: req.user.id, ...req.body }).save()
          .then(todo => {
            console.log(`inside then ${todo}`)
            return res.json(todo)
          })
          .catch(err => console.log(err));
      }
    })

})

// @route POST '/todos/:id/toggleCompleted'
// @desc toggle completed on todo
// @access Private
router.post(
  '/:id/toggleCompleted',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Todo.findById(req.params.id)
    .then(todo => {
      todo.completed = !todo.completed
      todo.save().then(todo => res.json(todo))
    })
  }
)

// router.get('/public/all')
// router.get('/public/:user_id')

module.exports = router;
