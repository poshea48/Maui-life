const express = require('express');
const router = express.Router();
const passport = require('passport')

const Bottle = require('../../models/Bottle');

const validateBottleInput = require('../../validation/bottle');

// @route GET /bottles
// @desc show all the bottles Jeed and Co drank
// @access Public
router.get('/', (req, res) => {
  Bottle.find((err, bottles, count) => {
    if (!bottles) {
      return res.json({msg: "No bottles just yet"})
    }
    return res.json(bottles)
  })
})

module.exports = router;
