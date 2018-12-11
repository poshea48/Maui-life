const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now()
  }

})

module.exports = Location = mongoose.model('locations', LocationSchema);
