import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import Spinner from '../common/Spinner'
import isEmpty from '../../validation/is-empty';

class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: {},
      commentUser: null
    }
  }

  // make get comment into actions (also get post)
  // get comments from comments in props
  getComment = () => {
    axios.get(`/api/comments/${this.props.comment}`)
      .then(res => {
        this.setState({ comment: res.data.comment, commentUser: res.data.user })
      })
  }

  componentDidUpdate() {

  }

  componentDidMount() {
    this.getComment()
  }

  render () {
    const {comment, commentUser} = this.state
    const date = !isEmpty(comment) && comment.date.split("T")[0]

    return (
      <div className="card card-body mb-1 bg-success">
        <div className="d-flex flex-column">
          {commentUser ? (
            <div className="col-md-12 ">
              <Link to={`/profile/user/${commentUser._id}`}>
                <div className="d-flex flex-row">
                  <img
                    style={{width: "50px", height: "50px"}}
                    className="rounded-circle d-md-block"
                    src={commentUser.avatar}
                    alt={commentUser.name}
                  />
                  <div className="col-10" >
                    <p className="text-muted m-0">{commentUser.name}</p>
                    <small>{date}</small>
                  </div>
                </div>
              </Link>
            </div>
          ) : (
            <div className="col-md-2">
              <p className="text-center">No known user</p>
            </div>
          )}

          <div className="col-md-10">
            <p className="lead">
              {comment.text}
            </p>
          </div>
        </div>
      </div>
    )
  }
}


export default CommentItem;
