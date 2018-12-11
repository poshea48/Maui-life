const express = require('express');
const router = express.Router();
const passport = require('passport')

const Picture = require('../../models/Picture');

const validatePictureInput = require('../../validation/picture');

// @route GET /pictures
// @desc show all the pictures Jeed and Co drank
// @access Public
router.get('/', (req, res) => {
  Picture.find((err, pictures, count) => {
    if (!pictures) {
      return res.json({msg: "No pictures just yet"})
    }
    return res.json(pictures)
  })
})

// @route POST /pictures
// @desc add a picture
// @access Private
router.post('/',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const { errors, isValid } = validatePictureInput(req.body);

    if (!isValid) {
      return res.status(404).json(errors)
    }
    const newPicture = new Picture({
      title: req.body.title,
      src: req.body.src,
      description: req.body.description
    })

    newPicture
      .save()
      .then(picture => res.json(picture))
      .catch(err => res.json(err));
  }
)

// @route GET /pictures/:title
// @desc show picture page
// @access Public
router.get('/:title', (req, res) => {
  const errors = {};
  Picture.findOne({ title: req.params.title }).then(picture => {
    if (!picture) {
      errors.picture = "Picture can not be found"
      res.status(404).json(errors)
    }

    res.json(picture)
  })
})

module.exports = router;
