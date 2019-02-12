const express = require('express');
const router = express.Router();
const passport = require('passport')

const Hike = require('../../models/Hike');

const validateHikeInput = require('../../validation/hike');

// @route GET /bottles
// @desc show all the bottles Jeed and Co drank
// @access Public
router.get(
  '/',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Hike.find({user: req.user.id}, (err, hikes, count) => {
      if (!hikes) {
        return res.json({msg: "No Hikes just yet"})
      }
      return res.json(hikes)
    })
  }
)

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // console.log(`the body: ${req.body}`)
    const { errors, isValid } = validateHikeInput(req.body);
    if(!isValid) {
      return res.status(404).json(errors);
    }
    // Add todo to list

    new Hike({user: req.user.id, ...req.body }).save()
      .then(hike => {
        return res.json(hike)
      })
      .catch(err => console.log(err))
  }
)

module.exports = router;
