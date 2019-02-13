import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PostItem from '../post/PostItem'

class PostFeed extends Component {
  render () {
    const { posts } = this.props
    const postFeed = posts.map(post => (
      <div key={post._id} className="card card-body mb-2">
        <PostItem
          post={post}
        />
      </div>
      )
    )
    return (
      <div className="posts d-flex flex-column justify-content-center">
        {postFeed}
      </div>
    )
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
}

export default PostFeed;
