const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateBottleInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.flavor = !isEmpty(data.flavor) ? data.flavor : '';
  data.size = !isEmpty(data.size) ? data.size : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required"
  }
  if (Validator.isEmpty(data.flavor)) {
    errors.flavor = "Flavor field is required"
  }
  if (Validator.isEmpty(data.size)) {
    errors.size = "Size field is required"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
