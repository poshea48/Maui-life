const express = require('express');
const router = express.Router();
const passport = require('passport');

const Location = require('../../models/Location');

const validateLocationInput = require('../../validation/location');

// @route GET '/areas_visited'
// @desc list all areas visited on Map
// @access Public
router.get('/', (req, res) => {
  // Get all locations from db
  Location.find((err, locations, count) => {
    if (locations) {
      return res.json(locations)
    } else {
      return res.json({msg: "No todos"})
    }
  })
  // display them
})

// @route POST '/areas_visited'
// @desc add a new area
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
  // Get all locations from db
    Location.find((err, locations, count) => {
      if (locations) {
        return res.json(locations)
      } else {
        return res.json({msg: "No todos"})
      }
    })
  // display them
})
module.exports = router;
