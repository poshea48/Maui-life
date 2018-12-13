const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile Model
const Profile = require('../../models/Profile')
// Load User model
const User = require('../../models/User')
// Load validator
const validateProfileInput = require('../../validation/profile')

// @route GET api/profile
// @desc  get current users profile
// @access Private
router.get('/',
passport.authenticate('jwt', { session: false }),
(req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
  .populate('user', ['name'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
})

module.exports = router;
