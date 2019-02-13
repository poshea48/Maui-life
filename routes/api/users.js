const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User Model
const User = require('../../models/User');

// @route GET api/users/test
// @desc Test users route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Users Works"}))

// @route POST api/users/register
// @desc register user
// @access Public
router.post('/register', (req, res) => {
  const {errors, isValid} = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(404).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists"});
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        })
      })
    }
  })
})

// @route GET api/users/login
// @desc Login user / Returning JWT Token
// @access Public
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log("I got here")
  const {errors, isValid} = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(404).json(errors);
  }

  // Find user by email
  User.findOne({email: email})
  .then(user => {
    // Check for user
    console.log(user)
    if (!user) {
      errors.login = "Incorrect user/password combination"
      return res.status(404).json(errors)
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if(isMatch) {
        // create jwt payload
        const payload = { id: user.id, name: user.name, avatar: user.avatar }

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 36000 },
          (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`
            })
          }
        )
      } else {
        errors.login = "Incorrect user/password combination"
        return res.status(400).json(errors);
      }
    })
  })
  .catch(err => console.log(err))
})

// @route GET api/users/current
// @desc show current user
// @access Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    })
  }
)
module.exports = router;
