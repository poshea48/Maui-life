const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  src: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }

})

module.exports = Picture = mongoose.model('pictures', PictureSchema);
