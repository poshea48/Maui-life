const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load models
const Post = require('../../models/Post');
const Like = require('../../models/Like');
const Comment = require('../../models/Comment');

// Load validations
const validatePostInput = require('../../validation/post');
const validateCommentInput = require('../../validation/comment');

// @route GET api/posts/test
// @desc  Test post route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Posts Works"}))

// @route GET api/posts/
// @desc  get all post
// @access Public
router.get('/', (req, res) => {
  const errors = {}
  Post.find()
  .sort({date: -1})
  .then(posts => {
    if(!posts) {
      errors.posts = "No posts found"
      return res.status(404).json(errors)
    }
    // WOuld it be better to add in comments now?

    res.json(posts)
  })
  .catch(err => res.status(404).json({ postsnotfound: "Posts could not be found"}))
})

// @route POST api/posts
// @desc  create a post
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors)
    }
    const post = new Post({
      ...req.body,
      user: req.user.id
    })
    console.log("inside crete post")

    post.save().then(post => res.json(post));
  }
)

// @route GET api/posts/:id
// @desc  get a post, with comments by post id
// @access Public
router.get('/:id', (req, res) => {
  const errors = {}
  // const fullPost = {}
  Post.findById(req.params.id)
  .then(post => {
    if(!post) {
      errors.posts = "No post found"
      return res.status(404).json(errors)
    }
    return res.json(post)
    // Comment.find({post: post._id})
    //   .then(comments => {
    //     post.comments = comments
    //     return res.json(post)
    //   })
    //   .catch(err => console.log(err))
    // .catch(err => res.status(404).json({ nocomments: "No comments"}))
  })
  .catch(err => console.log(`Post could not be found because: ${err}`))
})

// @route DELETE api/posts/:id
// @desc delete a post
// @access Private
router.delete(
  '/:id',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Post.findById(req.params.id)
    .then(post => {
      // Check for post owner
      if(post.user.toString() !== req.user.id) {
        return res.status(401).json({ notauthorized: "User not authorized"})
      }
      post.remove().then(() => res.json({ success: true}))
    })
    .catch(err => res.status(404).json({ postnotfound: "no post found"}))
  }
)

// @route GET api/posts/like/:id
// @desc check if current User liked a post
// @access Private
router.get(
  '/:id/like',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Like.findOne({ user: req.user.id, post: req.params.id })
      .then(like => res.json(like))
      .catch(err => console.log(err))
  }
)

// @route POST api/posts/like/:id
// @desc like a post
// @access Private
router.post(
  '/:id/like',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Post.findById(req.params.id)
    .then(post => {
      Like.find({post: post.id, user: req.user.id}).then(like => {
        if(like.length > 0) {
          return res.status(400).json({ msg: "You can only like once"})
        }
        const newLike = new Like({user: req.user.id, post: post.id})
        newLike.save().then(() => {
          post.likes_count = post.likes_count + 1
          post.save().then(post => res.json(post))
        })
      })

    })
    .catch(err => res.status(404).json({ postnotfound: "no post found"}))
  }
)
// @route POST api/posts/unlike/:id
// @desc like a post
// @access Private
router.post(
  '/:id/unlike',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Post.findById(req.params.id)
    .then(post => {
      Like.findOne({post: post.id, user: req.user.id}).then(like => {
        if(!like) {
          return res.status(400).json({ msg: "You must like before you dislike"})
        }

        like.remove().then(() => {
          post.likes_count = post.likes_count - 1;
          post.save().then(post => res.json(post))
        }).catch(err => console.log("SOmething happened" + err))
      })
      .catch(err => console.log(`Something went wrong when searching for like: ${err}`))
    })
    .catch(err => res.status(404).json({ postnotfound: "no post found"}))
  }
)

// @route GET /api/posts/comment/:id
// @desc get a comment
// Public
router.get(`/:id/comment`, (req, res) => {
  Comment.findById(req.params.id)
  .then(comment => res.json(comment))
  .catch(err => console.log(err))
})

// @route GET /api/posts/:id/comments
// @desc get all comments from a post
router.get(`/:id/comments`)

// @route POST /posts/:id/comments
// @desc add a comment
// Private
router.post(
  '/:id/comments',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);
    if (!isValid) {
      return res.status(404).json(errors)
    }

    Post.findById(req.params.id)
    .then(post => {
      const newComment = new Comment({
        user: req.user.id,
        post: req.params.id,
        text: req.body.text
      })
      newComment.save()
      .then(comment => {
        post.comments.push(comment)
        post.save()
        .then(post => res.json(post))
        .catch(err => res.json({err: err}))
      })
      .catch(err => res.json({err: err}))
    })
    .catch(err => res.json({err: err}))
  }
)

// @route DELETE /posts/comment/:id/:comment_id
// @desc delete a comment
// Private
router.delete(
  '/:id/comments/:comment_id',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const errors = {}
    Post.findById(req.params.id)
    .then(post => {
      Comment.findById(req.params.comment_id)
      .then(comment => {
        if(!comment) {
          errors.comment = "Comment doesnt exist";
          return res.json(errors)
        }
        if(comment.user.toString() === req.user.id || post.user.toString() === req.user.id) {
          comment.remove()
          .then(() => {
            Comment.find({post: post.id})
            .then(comments => res.json({post: post, comments: comments }))
            .catch(err => res.json({err: `Something happened: ${err}`}))
          })
          .catch(err => res.json({err: `Something happened: ${err}`}))
        } else {
          errors.comment = "You do not have the authority to remove that comment"
          return res.json(errors)
        }
      })
      .catch(err => res.json({err: `Something happened: ${err}`}))
    })
    .catch(err => console.log(`Something went wrong finding the post: ${err}`))
  }
)

module.exports = router;
