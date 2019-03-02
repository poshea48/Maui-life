import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";
import Spinner from "../common/Spinner";
import PostFeed from "./PostFeed";
import PostForm from "./PostForm";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postsContent;
    if (posts === null || loading) {
      postsContent = <Spinner />;
    } else {
      postsContent = <PostFeed posts={posts} />;
    }
    return (
      <div>
        <PostForm />
        {postsContent}
      </div>
    );
  }
}

Posts.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
  // likePost: PropTypes.func.isRequired,
  // removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    post: state.post
  };
};

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
