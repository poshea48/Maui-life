const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HikeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  distance: {
    type: String
  },
  rating: {
    type: Number,
    required: true
  },
  comments: {
    type: String
  }
})

module.exports = Hike = mongoose.model('hikes', HikeSchema);
