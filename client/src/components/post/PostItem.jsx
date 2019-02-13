import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames'
import axios from 'axios'
import { deletePost, likePost, removeLike } from '../../actions/postActions';
import Spinner from '../common/Spinner'
import CommentFeed from '../post/CommentFeed';

class PostItem extends Component {
  state = {
    postUser: {},
  }

  onDelete = e => {
    e.preventDefault();
    this.props.deletePost(this.props.post._id)
  }

  onLike = e => {
    e.preventDefault();
    this.props.likePost(this.props.post._id)
  }

  onUnLike = e => {
    e.preventDefault();
    this.props.removeLike(this.props.post._id)
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(prevState)
  //   console.log(this.props)
  //   // if (prevProps.state.post !== this.props.post) {
  //   //   this.setState({post: this.props.post})
  //   // }
  // }

  componentDidMount() {
    axios.get(`/api/profile/user/${this.props.post.user}`)
    .then(res => this.setState({ postUser: res.data.user}))
    .catch(err => console.log(err ))
  }

  render () {
    const { post } = this.props
    const currentUser = this.props.auth.user
    const { postUser } = this.state
    const currentLiked = (post.user === currentUser.id) && post.likes_count > 0
    const thumbIconClass = classnames({
      'fas fa-thumbs-up': true,
      'text-success': currentLiked,
      'text-secondary': !currentLiked
    })
    const date = post.date.split("T")[0]
    return (
      <div className="d-flex flex-column">
        {Object.keys(postUser).length > 0 ? (
          <div className="col-md-12">

            <Link to={`/profile/${postUser._id}`}>
              <div className="d-flex flex-row">
                <img
                  style={{width: "50px", height: "50px"}}
                  className="rounded-circle d-md-block"
                  src={postUser.avatar}
                  alt={postUser.name}
                />
                <div className="col-10" >
                  <p className="text-muted m-0">{postUser.name}</p>
                  <small>{date}</small>
                </div>
              </div>

            </Link>
          </div>
        ) : (
          <div className="col-md-12">
            <Spinner />
          </div>
        )}
        <div className="col-md-12 mt-2 mb-2">
          <p className="lead">{post.text}</p>
          <div className="d-flex flex-row border-top border-bottom justify-content-center">
            <button
              type="button"
              className="thumb btn btn-white mr-1"
              onClick={this.onLike} >
              <i className={thumbIconClass} />
              <span className="badge badge-white">{post.likes_count}</span>
            </button>
            <button
              type="button"
              className="thumb btn btn-white mr-1"
              onClick={this.onUnLike} >
              <i className="text-secondary fas fa-thumbs-down"></i>
            </button>

            {post.user === currentUser.id ? (
              <button
                type="button"
                className="thumb btn btn-white mr-1"
                onClick={this.onDelete}
                >
                <i className="fas fa-times text-danger" />
              </button>
            ) : null }
          </div>
        </div>
        <CommentFeed post={post} />
      </div>
    )
  }
}

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deletePost, likePost, removeLike})(PostItem);
