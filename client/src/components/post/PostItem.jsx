import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { deletePost, likePost, removeLike } from "../../actions/postActions";
import Spinner from "../common/Spinner";
import CommentFeed from "../post/CommentFeed";
import isEmpty from "../../validation/is-empty";

class PostItem extends Component {
  onDelete = e => {
    e.preventDefault();
    this.props.deletePost(this.props.post._id);
  };

  onLike = e => {
    e.preventDefault();
    this.props.likePost(this.props.post._id);
  };

  onUnLike = e => {
    e.preventDefault();
    this.props.removeLike(this.props.post._id);
  };

  render() {
    const { post } = this.props;
    if (isEmpty(post)) {
      return <Spinner />;
    }
    const currentUser = this.props.auth.user;
    const postUser = post.user;
    const currentLiked =
      postUser._id === currentUser.id && post.likes_count > 0;
    const thumbIconClass = classnames({
      "fas fa-thumbs-up": true,
      "text-success": currentLiked,
      "text-secondary": !currentLiked
    });
    const date = post.date.split("T")[0];
    return (
      <div className="d-flex flex-column">
        {Object.keys(postUser).length > 0 ? (
          <div className="col-md-12">
            <Link to={`/profile/${postUser._id}`}>
              <div className="d-flex flex-row">
                <img
                  style={{ width: "50px", height: "50px" }}
                  className="rounded-circle d-md-block"
                  src={postUser.avatar}
                  alt={postUser.name}
                />
                <div className="col-10">
                  <p className="text-muted m-0">{postUser.name}</p>
                  <small>{date}</small>
                </div>
              </div>
            </Link>
          </div>
        ) : (
          <div className="col-md-12">
            <p className="text-muted m-0">No known User</p>
          </div>
        )}
        <div className="col-md-12 mt-2 mb-2">
          <p className="lead">{post.text}</p>
          <div className="d-flex flex-row border-top border-bottom justify-content-center">
            <button
              type="button"
              className="thumb btn btn-white mr-1"
              onClick={this.onLike}
            >
              <i className={thumbIconClass} />
              <span className="badge badge-white">{post.likes_count}</span>
            </button>
            <button
              type="button"
              className="thumb btn btn-white mr-1"
              onClick={this.onUnLike}
            >
              <i className="text-secondary fas fa-thumbs-down" />
            </button>

            {postUser._id === currentUser.id ? (
              <button
                type="button"
                className="thumb btn btn-white mr-1"
                onClick={this.onDelete}
              >
                <i className="fas fa-times text-danger" />
              </button>
            ) : null}
          </div>
        </div>
        <CommentFeed post={post} />
      </div>
    );
  }
}

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, likePost, removeLike }
)(PostItem);
