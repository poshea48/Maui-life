const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false
  }
})

module.exports = Todo = mongoose.model('todos', TodoSchema);
