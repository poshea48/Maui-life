const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BottleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  flavor: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  drank: {
    type: Boolean,
    default: false
  }
})

module.exports = Bottle = mongoose.model('bottles', BottleSchema);
