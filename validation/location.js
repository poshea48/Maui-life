const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateLocationInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.longitude = !isEmpty(data.longitude) ? data.longitude : '';
  data.latitude = !isEmpty(data.latitude) ? data.latitude : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required"
  }
  if (Validator.isEmpty(data.longitude)) {
    errors.longitude = "longitude field is required"
  }
  if (Validator.isEmpty(data.latitude)) {
    errors.latitude = "Latitude field is required"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
