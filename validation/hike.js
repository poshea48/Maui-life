const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateHikeInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : '';
  data.date = !isEmpty(data.date) ? data.date : '';
  data.location = !isEmpty(data.location) ? data.location : '';
  data.rating = !isEmpty(data.rating) ? data.rating : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required"
  }

  if (Validator.isEmpty(data.date)) {
    errors.date = "Date field is required"
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = "Location field is required"
  }
  if (Validator.isEmpty(data.rating)) {
    errors.rating = "Rating field is required"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
