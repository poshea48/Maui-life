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
  console.log("heyyyyyy")
  Profile.findOne({ user: req.user.id })
  .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => {
      errors.internal = "Something went wrong with trying to find this profile"
      return res.status(404).json({err: "WHat happened"})
    })
})

// @route GET api/profile/all/
// @desc get all profiles
// @access Public
router.get('/all', (req, res) => {
  const errors = {}

  Profile.find()
  .populate('user', ['name', 'avatar'])
  .then(profiles => {
    if (!profiles) {
      errors.noprofiles = "Could not find any profiles"
      return res.status(404).json(errors)
    }

    res.json(profiles);
  })
  .catch(err => res.status(404).json({profile: "There are no profiles"}))
})

// @route GET api/profile/username/:username
// @desc get profile by handle
// @access Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ username: req.params.username })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route GET api/profile/user/:user_id
// @desc get profile by user_id
// @access Public
router.get('/user/:id', (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for that user";
        res.status(404).json(errors);
      }
      return res.json(profile);
    })
    .catch(err => console.log(err))
})

// @route POST api/profile
// @desc create profile
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors)
    }

    // Get fields
    const { username, location, twitter, facebook, linkedin, instagram } = req.body
    const profileFields = {
      ...req.body,
      user: req.user.id,
      social: { facebook, twitter, linkedin, instagram}
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          )
          .then(profile => res.json(profile))
          .catch(err => res.status(400).json({ err: `Something went wrong: ${err.response.data}`}))
        } else {
          // Create
          // Check if handle exists
          Profile.findOne({ username: profileFields.username })
            .then(profile => {
              if (profile) {
                errors.username = "That username already exists";
                return res.status(400).json(errors)
              }
              //Save profile
              new Profile(profileFields)
                .save()
                .then(profile => {
                  return res.json(profile)
                })
            })
        }
      })
  }
)

// @route   PUT api/profile
// @desc    update profile
// @access  Private



// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
