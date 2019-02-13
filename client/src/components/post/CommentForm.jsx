import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addComment } from '../../actions/postActions';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {}
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      return this.setState({ errors: this.props.errors })
    }

  }

  onSubmit = e => {
    e.preventDefault();
    this.props.addComment(this.props.postId, {text : this.state.text})
    this.setState({ text: '', errors: {}})
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    const { errors } = this.state
    return (
      <div className="post-form mt-3">
        <form onSubmit={this.onSubmit}>
          <div className="d-flex flex-row">
            <div className="col-8 col-sm-10 p-0">
              <div className="form-group">
                <input
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                  className="comment-input pl-2 text-muted rounded-left"
                  placeholder="Add a comment"
                />
              </div>
            </div>
            <div className="col-4 col-sm-2 p-0">
              <button type="submit" style={{width: "100%", height: "30px"}} className=" pt-0 pb-0 btn-br-0 btn-info rounded-right">Submit</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

CommentForm.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})



export default connect(mapStateToProps, {addComment})(CommentForm);
