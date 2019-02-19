import React, { Component } from 'react'
import axios from 'axios'
import { Link, Route } from 'react-router-dom'
import Spinner from '../common/Spinner'
import isEmpty from '../../validation/is-empty';
import CommentEditForm from './CommentEditForm';

class CommentItem extends Component {
  render () {
    const {comment, commentUser} = this.props
    const date = comment.date.split("T")[0]

    return (
      <div className="comment-field d-flex mb-3">
        <div className="p-0">
          {!isEmpty(commentUser) ? (
            <Link to={`/profile/user/${commentUser._id}`} className="text-info">
              <img
                style={{width: "32px", height: "32px"}}
                className="rounded-circle"
                src={commentUser.avatar}
                alt={commentUser.name}
              />
            </Link>
          ) : (
            <div
              style={{width: "35px", height: "35px"}}
              className="rounded-circle d-md-block"
            > No User
            </div>
          )}
        </div>
        <div className="d-flex flex-column ml-2" >
          <div className="d-flex" >
            <div className="card card-body comment-card d-flex pt-2 pb-2 pl-3 pr-3 bg-dark flex-row">
              <Route path="/home/posts/edit-comment"  component={CommentEditForm} />
              <p className="m-0 h6">
                {!isEmpty(commentUser) ? (
                  <span className="mt-2 mr-1 lead text-info ml-1 mr-0 font-weight-bold">
                    <Link to={`/profile/user/${commentUser._id}`} className="text-info">
                      {commentUser.name}
                    </Link>
                  </span>
                  ) : (
                    <span>No Known User</span>
                  )}
                <span className="text-white">{comment.text}</span>
              </p>
            </div>
            <div className="dropdown ml-2" style={{position: 'relative', width: '50px'}}>
              <button style={{border: "none"}} className="dropdown toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-ellipsis-h"></i>
              </button>

              <div className="dropdown-menu" style={{width: '50px'}} aria-labelledby="dropdownMenuButton">
                <Link to={'/home/posts/edit-comment'} className="text-info dropdown-item">
                  <i className="fas fa-pencil-alt"></i>
                  Edit
                </Link>
                <button className="dropdown-item text-info">
                  <i className="fa fa-trash"></i>
                  Delete
                </button>
              </div>
            </div>
          </div>

          <small className="ml-4">{date}</small>
        </div>
      </div>
    )
  }
}


export default CommentItem;
