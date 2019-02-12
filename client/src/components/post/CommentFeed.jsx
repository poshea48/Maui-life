import React, { Component } from 'react'
import CommentItem from './CommentItem'
import CommentForm from './CommentForm'

class CommentFeed extends Component {
  render() {
    const { post } = this.props
    const { comments } = post
    const commentsContent = comments
      .map(comment => (
      <CommentItem key={comment._id} comment={comment} />)
      )
    return (
      <div className="comments d-flex flex-column">
        <div>
          <CommentForm postId={post._id} />
        </div>
        <div className="col-md-12 pl-3 pr-3">
          {commentsContent}
        </div>
      </div>
    )
  }
}

export default CommentFeed
