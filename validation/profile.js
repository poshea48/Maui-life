const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};
  data.username = !isEmpty(data.username) ? data.username : '';

  if(!Validator.isLength(data.username, { min: 2, max: 40 })) {
    errors.username = "Username needs to be between 2 and 40 characters"
  }

  if(Validator.isEmpty(data.username)) {
    errors.username = "Profile Username is required"
  }

  if(!isEmpty(data.twitter)) {
    if(!Validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }
  if(!isEmpty(data.facebook)) {
    if(!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }
  if(!isEmpty(data.linkedin)) {
    if(!Validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL';
    }
  }
  if(!isEmpty(data.instagram)) {
    if(!Validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }

}
