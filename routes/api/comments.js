const express = require('express');
const router = express.Router();
const passport = require('passport')

const Comment = require('../../models/Comment');
const User = require('../../models/User')

router.get('/:id', (req, res) => {
  Comment.findById(req.params.id)
    .then(comment => {
      User.findById(comment.user)
        .then(user => {
          let newUser = {id: user._id, name: user.name, avatar: user.avatar}
          return res.json({comment, user: newUser})
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router;
